import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { type ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createProductRequest, deleteProductRequest, getProducts, ProductPayload, updateProductRequest } from "../api/products";
import { ProductFormDialog } from "../components/ProductFormDialog";
import { useAuth } from "../context/AuthContext";
import { Product } from "../types";

const PAGE_SIZE = 10;

export const InventoryPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const isAdmin = user?.role === "ADMIN";

  const load = async () => {
    setLoading(true);
    try {
      const response = await getProducts({ offset, limit: PAGE_SIZE, search, from: from || undefined, to: to || undefined });
      setItems(response.data);
      setTotal(response.meta.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [offset]);

  const submitProduct = async (payload: ProductPayload) => {
    if (selected) {
      await updateProductRequest(selected._id, payload);
      setToast("Producto actualizado");
    } else {
      await createProductRequest(payload);
      setToast("Producto creado");
    }

    setDialogOpen(false);
    setSelected(null);
    await load();
  };

  const removeProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "La acción lo marcará como inactivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (!result.isConfirmed) {
      return;
    }

    await deleteProductRequest(id);
    setToast("Producto eliminado");
    await load();
  };

  return (
    <Box className="enter-animated">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} sx={{ mb: 2 }}>
        <Typography variant="h4">Inventario</Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Typography variant="caption">+</Typography>}
            onClick={() => {
              setSelected(null);
              setDialogOpen(true);
            }}
          >
            Nuevo producto
          </Button>
        )}
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField label="Buscar por título" value={search} onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} fullWidth />
          <TextField label="Desde" type="date" InputLabelProps={{ shrink: true }} value={from} onChange={(event: ChangeEvent<HTMLInputElement>) => setFrom(event.target.value)} />
          <TextField label="Hasta" type="date" InputLabelProps={{ shrink: true }} value={to} onChange={(event: ChangeEvent<HTMLInputElement>) => setTo(event.target.value)} />
          <Button variant="outlined" onClick={() => { setOffset(0); void load(); }}>Filtrar</Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 1 }}>
        {loading ? (
          <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Fecha creación</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>$ {item.price}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{dayjs(item.creationAt).format("DD/MM/YYYY")}</TableCell>
                    <TableCell>
                      {isAdmin && (
                        <>
                          <IconButton
                            onClick={() => {
                              setSelected(item);
                              setDialogOpen(true);
                            }}
                          >
                            <Typography variant="caption">ED</Typography>
                          </IconButton>
                          <IconButton color="error" onClick={() => void removeProduct(item._id)}>
                            <Typography variant="caption">DEL</Typography>
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ p: 1 }}>
              <Button disabled={offset === 0} onClick={() => setOffset((prev) => Math.max(prev - PAGE_SIZE, 0))}>
                Anterior
              </Button>
              <Typography sx={{ alignSelf: "center" }}>
                {offset + 1}-{Math.min(offset + PAGE_SIZE, total)} de {total}
              </Typography>
              <Button disabled={offset + PAGE_SIZE >= total} onClick={() => setOffset((prev) => prev + PAGE_SIZE)}>
                Siguiente
              </Button>
            </Stack>
          </>
        )}
      </Paper>

      <ProductFormDialog open={dialogOpen} initial={selected} onClose={() => setDialogOpen(false)} onSubmit={submitProduct} />

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        message={toast}
      />
    </Box>
  );
};

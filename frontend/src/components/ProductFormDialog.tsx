import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Product } from "../types";

interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const ProductFormDialog = ({
  open,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial: Product | null;
  onClose: () => void;
  onSubmit: (values: Omit<ProductFormValues, "imageUrl"> & { images: string[] }) => Promise<void>;
}) => {
  const { control, handleSubmit, reset, watch, formState } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title,
        description: initial.description,
        category: initial.category,
        price: initial.price,
        stock: initial.stock,
        imageUrl: initial.images?.[0] || "",
      });
      return;
    }

    reset({ title: "", description: "", category: "", price: 0, stock: 0, imageUrl: "" });
  }, [initial, reset]);

  const imageUrl = watch("imageUrl");
  const preview = useMemo(() => imageUrl || "https://placehold.co/320x180?text=Preview", [imageUrl]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{initial ? "Editar producto" : "Nuevo producto"}</DialogTitle>
      <DialogContent>
        <Stack sx={{ mt: 1 }} spacing={2}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Título requerido" }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Título" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "Descripción requerida" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Descripción"
                multiline
                minRows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: "Categoría requerida" }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Categoría" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Precio requerido", min: { value: 0.01, message: "Debe ser mayor a 0" } }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Precio"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  inputProps={{ step: "0.01" }}
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              rules={{ required: "Stock requerido", min: { value: 0, message: "No puede ser negativo" } }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Stock"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>

          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <TextField {...field} label="URL de imagen" />}
          />

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Previsualización
            </Typography>
            <Box
              component="img"
              src={preview}
              onError={(event) => {
                (event.currentTarget as HTMLImageElement).src = "https://placehold.co/320x180?text=No+Image";
              }}
              alt="Preview"
              sx={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 2, border: "1px solid #e2e8f0" }}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          disabled={formState.isSubmitting}
          onClick={handleSubmit(async (values) => {
            await onSubmit({
              title: values.title,
              description: values.description,
              category: values.category,
              price: Number(values.price),
              stock: Number(values.stock),
              images: values.imageUrl ? [values.imageUrl] : [],
            });
          })}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

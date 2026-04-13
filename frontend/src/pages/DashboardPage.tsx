import { Box, Card, CardContent, Grid2, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import Decimal from "decimal.js";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getProducts } from "../api/products";
import { KpiCard } from "../components/KpiCard";
import { Product } from "../types";

const PIE_COLORS = ["#0B5FFF", "#13B57C", "#FF9F1C", "#E4572E", "#5A4FCF", "#00A8A8"];

export const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts({ offset: 0, limit: 200 });
        setProducts(response.data);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const kpis = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, item) => acc.plus(new Decimal(item.price).times(item.stock)), new Decimal(0));

    const categoryStockMap = products.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.stock;
      return acc;
    }, {});

    const leader = Object.entries(categoryStockMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return {
      totalProducts,
      totalValue: totalValue.toFixed(2),
      leader,
    };
  }, [products]);

  const pieData = useMemo(() => {
    const grouped = products.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [products]);

  const expensiveTop5 = useMemo(() => {
    return [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 5)
      .map((item) => ({ name: item.title, price: item.price }));
  }, [products]);

  const latest = useMemo(() => {
    return [...products]
      .sort((a, b) => dayjs(b.creationAt).valueOf() - dayjs(a.creationAt).valueOf())
      .slice(0, 5);
  }, [products]);

  if (loading) {
    return <Typography>Cargando dashboard...</Typography>;
  }

  return (
    <Box className="enter-animated">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard gerencial
      </Typography>

      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KpiCard title="Total de productos" value={`${kpis.totalProducts}`} icon={<Typography variant="caption">INV</Typography>} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KpiCard title="Valor total inventario" value={`$ ${kpis.totalValue}`} icon={<Typography variant="caption">USD</Typography>} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <KpiCard title="Categoría líder" value={kpis.leader} icon={<Typography variant="caption">CAT</Typography>} />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Distribución por categoría
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Top 5 productos más caros
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={expensiveTop5}>
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="price" fill="#0B5FFF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Actividad reciente
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha creación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latest.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>$ {item.price}</TableCell>
                  <TableCell>{dayjs(item.creationAt).format("DD/MM/YYYY")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginValues {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper
        elevation={0}
        className="enter-animated"
        sx={{ p: 4, width: "100%", maxWidth: 420, border: "1px solid #dbe8ff", bgcolor: "#ffffffde" }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Iniciar sesión
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Accede al panel de inventario y métricas
        </Typography>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}

          <Controller
            control={control}
            name="email"
            rules={{ required: "Email requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" } }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Password requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button
            variant="contained"
            size="large"
            disabled={formState.isSubmitting}
            onClick={handleSubmit(async (values) => {
              setError(null);
              try {
                await login(values.email, values.password);
                navigate("/dashboard", { replace: true });
              } catch {
                setError("Credenciales incorrectas");
              }
            })}
          >
            Entrar
          </Button>

          <Typography variant="body2" color="text.secondary">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

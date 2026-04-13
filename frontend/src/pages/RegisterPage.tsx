import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState } = useForm<RegisterValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper elevation={0} sx={{ p: 4, width: "100%", maxWidth: 460, border: "1px solid #dbe8ff", bgcolor: "#ffffffde" }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Crear cuenta
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Registra un usuario para acceder al dashboard
        </Typography>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}

          <Controller
            control={control}
            name="name"
            rules={{ required: "Nombre requerido" }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Nombre" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ required: "Email requerido", pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" } }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Email" type="email" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password requerido",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
                message: "Debe incluir mayúscula, minúscula, número y símbolo",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField {...field} label="Password" type="password" error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />

          <Button
            variant="contained"
            size="large"
            disabled={formState.isSubmitting}
            onClick={handleSubmit(async (values) => {
              setError(null);
              try {
                await register(values);
                navigate("/dashboard", { replace: true });
              } catch {
                setError("No se pudo crear la cuenta");
              }
            })}
          >
            Registrarme
          </Button>

          <Typography variant="body2" color="text.secondary">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { type ChangeEvent, type FocusEvent, useEffect, useState } from "react";
import { getUsers, updateUserRequest, updateUserStatusRequest } from "../api/users";
import { UserItem } from "../types";

export const UsersPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlyActive, setOnlyActive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const response = await getUsers({ offset: 0, limit: 100, active: onlyActive ? true : undefined });
      setUsers(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [onlyActive]);

  return (
    <Stack spacing={2} className="enter-animated">
      <Typography variant="h4">Administración de usuarios</Typography>
      <FormControlLabel
        control={<Switch checked={onlyActive} onChange={(event: ChangeEvent<HTMLInputElement>) => setOnlyActive(event.target.checked)} />}
        label="Mostrar solo activos"
      />

      <Paper sx={{ p: 1 }}>
        {loading ? (
          <Stack sx={{ p: 4, alignItems: "center" }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <TextField
                      variant="standard"
                      defaultValue={user.name}
                      onBlur={async (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        if (event.target.value !== user.name) {
                          await updateUserRequest(user._id, { name: event.target.value });
                          setToast("Usuario actualizado");
                          await load();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <FormControl variant="standard" size="small" fullWidth>
                      <InputLabel id={`role-label-${user._id}`}>Rol</InputLabel>
                      <Select
                        labelId={`role-label-${user._id}`}
                        defaultValue={user.role}
                        label="Rol"
                        onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.value as "ADMIN" | "USER";
                        if (value !== user.role) {
                          await updateUserRequest(user._id, { role: value });
                          setToast("Rol actualizado");
                          await load();
                        }
                        }}
                      >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{user.active ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>
                    <Switch
                      checked={user.active}
                      onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                        await updateUserStatusRequest(user._id, event.target.checked);
                        setToast("Estado actualizado");
                        await load();
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast(null)} message={toast} />
    </Stack>
  );
};

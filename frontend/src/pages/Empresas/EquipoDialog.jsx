import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Divider,
  Typography
} from "@mui/material";

export default function EquipoDialog({
  open,
  onClose,
  onSave,
  editingEquipo,

  nombreOS,
  setNombreOS,

  hostname,
  setHostname,

  ip,
  setIp,

  tipoConexion,
  setTipoConexion,

  sshUsuario,
  setSshUsuario,

  sshPassword,
  setSshPassword,

  sshPuerto,
  setSshPuerto
}) {

  const requiereSSH =
    tipoConexion === "SSH";

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>

        {editingEquipo
          ? "Editar Equipo"
          : "Nuevo Equipo"}

      </DialogTitle>

      <DialogContent>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Sistema Operativo"
          value={nombreOS}
          onChange={(e) =>
            setNombreOS(
              e.target.value
            )
          }
        >
          <MenuItem value="windows">
            Windows
          </MenuItem>

          <MenuItem value="linux">
            Linux
          </MenuItem>

        </TextField>

        <TextField
          fullWidth
          margin="normal"
          label="Hostname"
          placeholder="ej: equipo1"
          value={hostname}
          onChange={(e) =>
            setHostname(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="IP"
          placeholder="ej: 1.1.1.1"
          value={ip}
          onChange={(e) =>
            setIp(
              e.target.value
            )
          }
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Tipo de conexión"
          value={tipoConexion}
          onChange={(e) =>
            setTipoConexion(
              e.target.value
            )
          }
        >

          <MenuItem value="LOCAL">
            LOCAL
          </MenuItem>

          <MenuItem value="SSH">
            SSH
          </MenuItem>

        </TextField>

        {requiereSSH && (

          <>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Credenciales SSH
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Usuario SSH"
              value={sshUsuario}
              onChange={(e) =>
                setSshUsuario(
                  e.target.value
                )
              }
            />

            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Contraseña SSH"
              value={sshPassword}
              onChange={(e) =>
                setSshPassword(
                  e.target.value
                )
              }
            />

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Puerto SSH"
              value={sshPuerto}
              onChange={(e) =>
                setSshPuerto(
                  e.target.value
                )
              }
            />

          </>

        )}

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={
            !nombreOS?.trim() ||
            !hostname?.trim() ||
            !ip?.trim() ||
            !tipoConexion ||
            (
              requiereSSH &&
              (
                !sshUsuario?.trim() ||
                !sshPassword?.trim() ||
                !String(sshPuerto)?.trim()
              )
            )
          }
        >
          Guardar
        </Button>

      </DialogActions>

    </Dialog>
  );
}
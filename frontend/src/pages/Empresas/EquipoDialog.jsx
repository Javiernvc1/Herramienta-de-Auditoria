import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
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
  setIp
}) {

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
          autoFocus
          fullWidth
          margin="normal"
          label="Sistema Operativo"
          value={nombreOS}
          onChange={(e) =>
            setNombreOS(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Hostname"
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
          value={ip}
          onChange={(e) =>
            setIp(
              e.target.value
            )
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={
            !nombreOS?.trim() ||
            !hostname?.trim() ||
            !ip?.trim()
          }
        >
          Guardar
        </Button>

      </DialogActions>

    </Dialog>

  );
}
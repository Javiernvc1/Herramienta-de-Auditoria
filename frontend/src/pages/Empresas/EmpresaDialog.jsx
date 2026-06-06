import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

export default function EmpresaDialog({
  open,
  onClose,
  onSave,
  nombre,
  setNombre,
  editingEmpresa
}) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>

        {editingEmpresa
          ? "Editar Empresa"
          : "Nueva Empresa"}

      </DialogTitle>

      <DialogContent>

        <TextField
          autoFocus
          fullWidth
          margin="normal"
          label="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(
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
            !nombre?.trim()
          }
        >
          Guardar
        </Button>

      </DialogActions>

    </Dialog>

  );
}
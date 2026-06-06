import {
    useEffect,
    useState
} from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

export default function ControlDialog({
    open,
    onClose,
    onSave,
    control,
    marcos
}) {

    const [nombre, setNombre] =
        useState("");

    const [marcoId, setMarcoId] =
        useState("");

    useEffect(() => {

        if (control) {

            setNombre(
                control.nombre || ""
            );

            setMarcoId(
                control.Marcos?.[0]
                    ?.id_marco || ""
            );

        } else {

            setNombre("");

            setMarcoId("");
        }

    }, [control, open]);

    function handleSubmit() {

        onSave({
            nombre,
            marcoId
        });
    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {control
                    ? "Editar Control"
                    : "Nuevo Control"}

            </DialogTitle>

            <DialogContent>

                <TextField
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

                <FormControl
                    fullWidth
                    margin="normal"
                >

                    <InputLabel>
                        Marco
                    </InputLabel>

                    <Select
                        value={marcoId}
                        label="Marco"
                        onChange={(e) =>
                            setMarcoId(
                                e.target.value
                            )
                        }
                    >

                        {marcos.map(
                            (marco) => (

                                <MenuItem
                                    key={
                                        marco.id_marco
                                    }
                                    value={
                                        marco.id_marco
                                    }
                                >
                                    {marco.nombre}
                                </MenuItem>

                            )
                        )}

                    </Select>

                </FormControl>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>

    );
}
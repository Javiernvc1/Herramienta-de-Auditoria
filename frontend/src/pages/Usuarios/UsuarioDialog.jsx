import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem
} from "@mui/material";

const roles = [
    {
        id: 1,
        nombre: "AUDITOR"
    },
    {
        id: 2,
        nombre: "ADMIN"
    }
];

export default function UsuarioDialog({
    open,
    onClose,
    onSave,
    editingUser,

    nombre,
    setNombre,

    apellido,
    setApellido,

    email,
    setEmail,

    roleId,
    setRoleId,

    password,
    setPassword,

    newPassword,
    setNewPassword
}) {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                {editingUser
                    ? "Editar Usuario"
                    : "Nuevo Usuario"}

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

                <TextField
                    fullWidth
                    margin="normal"
                    label="Apellido"
                    value={apellido}
                    onChange={(e) =>
                        setApellido(
                            e.target.value
                        )
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Rol"
                    value={roleId}
                    onChange={(e) =>
                        setRoleId(
                            e.target.value
                        )
                    }
                >

                    {roles.map(
                        (rol) => (

                            <MenuItem
                                key={rol.id}
                                value={rol.id}
                            >
                                {rol.nombre}
                            </MenuItem>

                        )
                    )}

                </TextField>

                {!editingUser ? (

                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Contraseña"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                ) : (

                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            type="password"
                            label="Contraseña Actual"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            type="password"
                            label="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(
                                    e.target.value
                                )
                            }
                        />
                    </>

                )}

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
                        !nombre?.trim() ||
                        !email?.trim() ||
                        !roleId ||
                        !password?.trim()
                    }
                >
                    Guardar
                </Button>

            </DialogActions>

        </Dialog>

    );
}
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  createAuditoria,
  assignEmpresa,
  assignMarco,
  assignUser
} from "../../services/auditoria.service";

import {
  getEmpresas
} from "../../services/empresa.service";

import {
  getMarcos
} from "../../services/marco.service";

import {
  getUsersByRole
} from "../../services/user.service";

export default function CrearAuditoria() {

  const navigate = useNavigate();

  const [empresas, setEmpresas] = useState([]);
  const [marcos, setMarcos] = useState([]);
  const [auditores, setAuditores] = useState([]);

  const [empresaId, setEmpresaId] = useState("");
  const [marcoId, setMarcoId] = useState("");
  const [auditorId, setAuditorId] = useState("");

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          empresasData,
          marcosData,
          auditoresData
        ] = await Promise.all([
          getEmpresas(),
          getMarcos(),
          getUsersByRole(1)
        ]);

        setEmpresas(empresasData);
        setMarcos(marcosData);
        setAuditores(auditoresData);

      } catch (error) {

        console.error(error);
      }
    };

    loadData();

  }, []);

  const handleSubmit = async () => {

    try {

      if (
        !empresaId ||
        !marcoId ||
        !auditorId
      ) {

        alert(
          "Complete todos los campos"
        );

        return;
      }

      const auditoria =
        await createAuditoria({
          fecha: new Date()
        });

      await assignEmpresa(
        auditoria.id_auditoria,
        empresaId
      );

      await assignMarco(
        auditoria.id_auditoria,
        marcoId
      );

      await assignUser(
        auditoria.id_auditoria,
        auditorId
      );

      alert(
        "Auditoría creada correctamente"
      );

      navigate("/auditorias");

    } catch (error) {

      console.error(error);

      alert(
        "Error creando auditoría"
      );
    }
  };

  return (
    <Box p={3}>

      <Typography
        variant="h4"
        gutterBottom
      >
        Crear Auditoría
      </Typography>

      <Paper
        sx={{
          p: 3,
          maxWidth: 600
        }}
      >

        <Stack spacing={3}>

          <TextField
            select
            label="Empresa"
            value={empresaId}
            onChange={(e) =>
              setEmpresaId(
                e.target.value
              )
            }
            fullWidth
          >
            {empresas.map(
              (empresa) => (
                <MenuItem
                  key={
                    empresa.id_empresa
                  }
                  value={
                    empresa.id_empresa
                  }
                >
                  {empresa.nombre}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            select
            label="Marco"
            value={marcoId}
            onChange={(e) =>
              setMarcoId(
                e.target.value
              )
            }
            fullWidth
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
          </TextField>

          <TextField
            select
            label="Auditor"
            value={auditorId}
            onChange={(e) =>
              setAuditorId(
                e.target.value
              )
            }
            fullWidth
          >
            {auditores.map(
              (auditor) => (
                <MenuItem
                  key={auditor.id}
                  value={auditor.id}
                >
                  {auditor.nombre}{" "}
                  {auditor.apellido}
                </MenuItem>
              )
            )}
          </TextField>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Guardar Auditoría
          </Button>

        </Stack>

      </Paper>

    </Box>
  );
}
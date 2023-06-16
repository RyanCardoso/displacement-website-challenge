// Libs
import React, { useEffect, useState } from "react";

// Ui
import {
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Services
import { ClientService } from "@/services";
import { ClientDTO } from "@/types";

const formatAddress = (bairro: string, cidade: string, uf: string) => {
  return `${bairro}, ${cidade} - ${uf.toUpperCase()}`;
};

export default function Home() {
  const clientService = new ClientService();

  const [client, setClient] = useState<ClientDTO[]>([]);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const getData = async () => {
    try {
      const response = await clientService.getAll();
      setClient(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveClient = async (id: string) => {
    setDeleteLoading(id);

    try {
      await clientService.deleteTeste(id);
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    getData();
    console.count("renderizei a home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <h1>Clientes</h1>

      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Endereço</TableCell>
              {/* Action Column */}
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {client?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>
                  <Typography fontSize={12}>{row.tipoDocumento}</Typography>
                  <Typography fontSize={14}>{row.numeroDocumento}</Typography>
                </TableCell>
                <TableCell>
                  {formatAddress(row.bairro, row.cidade, row.uf)}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => handleRemoveClient(row.id)}
                  >
                    {deleteLoading === row.id ? (
                      <CircularProgress size={14} />
                    ) : (
                      <DeleteIcon fontSize="inherit" />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

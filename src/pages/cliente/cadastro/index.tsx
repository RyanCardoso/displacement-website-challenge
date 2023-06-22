// Libs
import React from "react";

// Ui
import { Container } from "@mui/material";

// Services
import { ClientService } from "@/services";
import { ClientForm } from "@/components";

export default function RegisterClient() {
  const clientService = new ClientService();

  return (
    <Container maxWidth="lg">
      <h1>Cadastro</h1>

      <ClientForm />
    </Container>
  );
}

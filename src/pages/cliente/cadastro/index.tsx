// Libs
import React from "react";

// Ui
import { Box as Wrapper, Container } from "@mui/material";
import { BreadcrumbsUI, ClientForm } from "@/components";

export default function RegisterClient() {
  return (
    <Container maxWidth="lg">
      <Wrapper display="flex" flexDirection="column" gap={2} pt={4}>
        <h1>Cadastro</h1>
        <BreadcrumbsUI />
        <ClientForm />
      </Wrapper>
    </Container>
  );
}

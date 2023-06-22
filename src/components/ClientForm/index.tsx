// Libs
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Ui
import { Box, CircularProgress } from "@mui/material";
import { InputForm, SelectForm } from "@/components";
import LoadingButton from "@mui/lab/LoadingButton";

// Services
import { ClientService } from "@/services";

// Types
import { ClientFormDTO } from "@/types";

// Utils
import { maskCEP } from "@/utils";
import {
  clientDefaultValues,
  clientSchema,
  documentOptions,
  ufOptions,
} from "./helpers";

export const ClientForm = () => {
  const router = useRouter();
  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const clientService = new ClientService();

  const { setValue, handleSubmit, control } = useForm<ClientFormDTO>({
    mode: "onChange",
    resolver: yupResolver(clientSchema),
    defaultValues: clientDefaultValues,
  });

  const handleChangeCep = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const valueFormatted = maskCEP(value);
    event.target.value = valueFormatted;

    if (value.length === 9) {
      setLoadingCEP(true);

      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${valueFormatted}/json/`
        );

        setValue("street", response.data.logradouro);
        setValue("neighborhood", response.data.bairro);
        setValue("city", response.data.localidade);
        setValue("uf", response.data.uf);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  const handleSubmitForm = handleSubmit(async (data) => {
    setLoadingSubmit(true);

    try {
      await clientService.create({
        nome: `${data.firstName} ${data.lastName}`,
        tipoDocumento: data.typeDocument,
        numeroDocumento: data.document,
        logradouro: data.street,
        numero: data.number,
        bairro: data.neighborhood,
        uf: data.uf,
        cidade: data.city,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmit(false);
    }
  });

  return (
    <Box
      component="form"
      width="100%"
      maxWidth="sm"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      onSubmit={handleSubmitForm}
    >
      <Box display="flex" justifyContent="space-between" gap={2} width="100%">
        <InputForm
          control={control}
          name="firstName"
          label="Primeiro nome"
          fullWidth
        />

        <InputForm
          control={control}
          name="lastName"
          label="Último nome"
          fullWidth
        />
      </Box>

      <Box display="flex" justifyContent="space-between" gap={2} width="100%">
        <SelectForm
          control={control}
          name="typeDocument"
          label="Tipo de documento"
          options={documentOptions}
          fullWidth
        />

        <InputForm
          control={control}
          name="document"
          label="Documento"
          fullWidth
        />
      </Box>

      <InputForm
        control={control}
        name="cep"
        label="CEP"
        fullWidth
        onChange={handleChangeCep}
        InputProps={{
          endAdornment: loadingCEP && <CircularProgress size={15} />,
        }}
        inputProps={{
          maxLength: 9,
        }}
      />

      <Box display="flex" justifyContent="space-between" gap={2} width="100%">
        <InputForm
          control={control}
          name="street"
          label="Logradouro"
          fullWidth
        />

        <InputForm
          control={control}
          name="number"
          label="Número"
          sx={{ width: "200px" }}
        />
      </Box>

      <InputForm
        control={control}
        name="neighborhood"
        label="Bairro"
        fullWidth
      />

      <Box display="flex" justifyContent="space-between" gap={2} width="100%">
        <SelectForm
          control={control}
          name="uf"
          label="UF"
          options={ufOptions}
          sx={{ minWidth: "100px" }}
        />

        <InputForm control={control} name="city" label="Cidade" fullWidth />
      </Box>

      <LoadingButton
        type="submit"
        variant="contained"
        loading={loadingSubmit}
        disableElevation
      >
        Cadastrar
      </LoadingButton>
    </Box>
  );
};

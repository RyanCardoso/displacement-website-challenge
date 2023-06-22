// Libs
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Ui
import { Box, Button, CircularProgress } from "@mui/material";
import { InputForm, SelectForm } from "@/components";

// Types
import { ClientFormDTO } from "@/types";

// Utils
import { maskCEP } from "@/utils";
import { clientSchema, documentOptions, ufOptions } from "./helpers";

export const ClientForm = () => {
  const [loadingCEP, setLoadingCEP] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormDTO>({
    mode: "onChange",
    resolver: yupResolver(clientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      typeDocument: "",
      document: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      uf: "",
      city: "",
    },
  });

  const handleChangeCep = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    event.target.value = maskCEP(value);

    if (value.length === 9) {
      setLoadingCEP(true);

      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
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

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);
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

      <Button type="submit" variant="outlined">
        Cadastrar
      </Button>
    </Box>
  );
};

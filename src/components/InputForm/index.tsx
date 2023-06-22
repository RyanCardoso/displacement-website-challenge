// Libs
import React from "react";
import { Control, Controller } from "react-hook-form";

// UI
import { TextField, TextFieldProps } from "@mui/material";

// Types
import { ClientFormDTO } from "@/types";

type InputFormProps = TextFieldProps & {
  control: Control<ClientFormDTO, any>;
  name: keyof ClientFormDTO;
};

export const InputForm = ({ control, name, ...props }: InputFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field }, formState: { errors } }) => (
        <TextField
          size="small"
          {...field}
          {...props}
          onChange={(ev) => {
            props?.onChange?.(ev);
            onChange(ev);
          }}
          helperText={errors[name]?.message}
          error={!!errors[name]}
        />
      )}
    />
  );
};

// Libs
import React from "react";
import { ClientFormDTO } from "@/types";
import { Control, Controller } from "react-hook-form";

// UI
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

type SelectFormProps = SelectProps<string> & {
  control: Control<ClientFormDTO, any>;
  name: keyof ClientFormDTO;
  label: string;
  options: string[];
};

export const SelectForm = ({
  control,
  name,
  label,
  options,
  ...props
}: SelectFormProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field }, formState: { errors } }) => (
        <FormControl
          fullWidth={props?.fullWidth}
          sx={props?.sx}
          size="small"
          error={!!errors[name]}
        >
          <InputLabel id={props.id}>{label}</InputLabel>
          <Select
            labelId={props.id}
            label={label}
            {...field}
            {...props}
            onChange={(ev, child) => {
              props?.onChange?.(ev, child);
              onChange(ev.target.value);
            }}
          >
            <MenuItem value="" disabled>
              Selecione
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

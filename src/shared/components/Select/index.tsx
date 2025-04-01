'use client';

import React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  SelectProps as SelectPropsMUI,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type SelectProps = SelectPropsMUI & {
  name: string;
  data?: { name: string; value: string }[];
};

export function RHFSelect({
  name,
  defaultValue = '',
  disabled = false,
  label,
  data,
  children,
  ...rest
}: SelectProps) {
  const { control } = useFormContext();

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        disabled={disabled}
        name={name}
        control={control}
        defaultValue={defaultValue}
        {...rest}
        render={({ field, fieldState: { error } }) => (
          <>
          <SelectMUI label={label} {...field} >
            {data?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
            {children}
          </SelectMUI>
          {error && (
              <FormHelperText sx={{ color: 'error.main' }}>{error.message}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
}

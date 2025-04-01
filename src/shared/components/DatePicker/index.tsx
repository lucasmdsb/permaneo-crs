'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker,
  DatePickerProps as DatePickerPropsMUI,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

interface DatePickerProps extends DatePickerPropsMUI<any, any> {
  name: string;
}

export function RHFDatePicker({
  name,
  defaultValue,
  label,
  disableFuture,
  disablePast,
  ...rest
}: DatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { ref, onChange, value, ...restRender },
        fieldState: { error },
      }) => (
        <FormControl fullWidth error={!!error} sx={{ mb: 2 }}>
          {label && <InputLabel shrink>{label}</InputLabel>}
          <DatePicker
            slotProps={{ textField: { fullWidth: true } }}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={(event: any) => {
              onChange(event);
            }}
            {...restRender}
            inputRef={ref}
            value={dayjs(value)}
            {...rest}
          />
          {error && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

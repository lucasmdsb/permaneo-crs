'use client';

import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import {
  TimePicker,
  TimePickerProps as TimePickerPropsMUI,
} from '@mui/x-date-pickers';

interface TimePickerProps extends TimePickerPropsMUI<any, any> {
  name: string;
}

export function RHFTimePicker({
  name,
  defaultValue,
  label,
  disableFuture,
  disablePast,
  ...rest
}: TimePickerProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { ref, onChange, ...restRender },
        fieldState: { error },
      }) => (
        <TimePicker
          label={label}
          slotProps={{ textField: { fullWidth: true } }}
          disablePast={disablePast}
          disableFuture={disableFuture}
          onChange={(event: any) => {
            onChange(event);
          }}
          {...restRender}
          inputRef={ref}
          sx={{
            border: error ? '1px solid #D84414' : 'none',
            borderRadius: '13px',
          }}
          {...rest}
        />
      )}
    />
  );
}

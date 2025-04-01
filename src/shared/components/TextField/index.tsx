import { useFormContext, Controller } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

type RHFTextFieldProps = TextFieldProps & {
  name: string;
};

export function RHFTextField({
  name,
  defaultValue = '',
  disabled = false,
  type,
  helperText,
  ...rest
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      disabled={disabled}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...rest}
        />
      )}
    />
  );
};

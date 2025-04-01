import { useFormContext, Controller } from 'react-hook-form';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';
import { TextField, TextFieldProps } from '@mui/material';

type TextFieldMaskProps = InputMaskProps & TextFieldProps;

type RHFTextFieldMaskProps = TextFieldMaskProps & {
  name: string;
};

export function RHFTextFieldMask({
  name,
  helperText,
  disabled,
  mask,
  ...rest
}: RHFTextFieldMaskProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <InputMask
          {...field}
          inputRef={ref}
          mask={mask}
          disabled={disabled}
          alwaysShowMask={false}
          onChange={(event) => {
            field.onChange(event.target.value.replace(/[^\d]/g, ''));
          }}
        >
          <TextField
            {...rest}
            error={!!error}
            helperText={error ? error?.message : helperText}
          />
        </InputMask>
      )}
    />
  );
}

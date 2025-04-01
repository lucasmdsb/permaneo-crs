import { useFormContext, Controller } from 'react-hook-form';

import FormHelperText from '@mui/material/FormHelperText';
import { Upload, UploadBox, UploadProps } from '../Upload';

interface RHFUploadProps extends Omit<UploadProps, 'file'> {
  name: string;
  multiple?: boolean;
}

export function RHFUploadBox({ name, ...rest }: RHFUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UploadBox files={field.value} error={!!error} {...rest} />
      )}
    />
  );
}

export function RHFUpload({
  name,
  multiple,
  helperText,
  ...rest
}: RHFUploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...rest}
          />
        ) : (
          <Upload
            accept={{ 'image/*': [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...rest}
          />
        )
      }
    />
  );
}

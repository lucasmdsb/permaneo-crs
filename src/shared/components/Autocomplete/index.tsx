import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete } from './textfield';
import { QueryDto } from '@/api/query';

interface AutocompleteProps {
  fetchRequest: ({ page, perPage }: QueryDto) => Promise<any[]>;
  name: string;
  disabled?: boolean;
  helperText?: string;
  placeholder?: string;
  rules?: any;
  redirectCreate?: string;
  options?: any;
  create?: (value: string) => Promise<any>;
  labelField?: string;
  onChange?: any;
  value?: any;
}

export const RHFAutocomplete = ({
  helperText,
  fetchRequest,
  placeholder,
  redirectCreate,
  rules,
  disabled,
  name,
  options,
  create,
  labelField,
  onChange,
  value,
  ...rest
}: AutocompleteProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={options?.multiple ? [] : null}
      render={({ field: { ref, onChange: fieldOnChange ,...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          customOptions={{ label: labelField ?? 'name' }}
          multiple={options?.multiple}
          disableCloseOnSelect={false}
          disabled={disabled}
          defaultLast={{ to: redirectCreate ?? '', create }}
          fetch={fetchRequest}
          inputRef={ref}
          placeholder={placeholder ?? ''}
          error={!!error}
          helperText={
            error
              ? error?.message
              : !!disabled
              ? helperText || 'Esse campo não pode ser editado após a criação'
              : helperText
          }
          onChange={(newvalue, data) => {
            if (onChange) onChange(newvalue, data);

            fieldOnChange(newvalue);
          }}
          {...rest}
        />
      )}
    />
  );
};

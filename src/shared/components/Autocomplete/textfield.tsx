import React, { useEffect, useState } from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete as AutocompleteMUI,
  Checkbox,
  Radio,
  TextField,
} from '@mui/material';
import lodash, { create } from 'lodash';

import { QueryDto } from '@/api/query';

interface Component {
  loading: boolean;
  open: boolean;
  page: number;
  firstOpen: boolean;
  query: string;
  hasMore: boolean;
  data: any;
}

interface AutocompleteProps {
  onChange(option: string | string[] | unknown, data: Component['data']): void;
  fetch(data: QueryDto): Promise<any>;
  value?: any;
  defaultLast?: {
    create?: (value: string) => Promise<any>;
    to?: string;
  };
  inputRef?: React.Ref<HTMLInputElement>;
  data?: any;
  multiple?: boolean;
  disableCloseOnSelect?: boolean;
  limitTags?: number;
  error?: boolean;
  errorText?: any;
  placeholder: string;
  label?: string;
  helperText?: string;
  customOptions?: {
    label: string;
  };
  disabled?: boolean;
  disabledMore?: boolean;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  data,
  defaultLast,
  helperText,
  placeholder,
  label,
  error,
  disabledMore = false,
  onChange,
  fetch,
  multiple = false,
  disableCloseOnSelect = true,
  limitTags = 3,
  customOptions = { label: 'name' },
  disabled = false,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [createValue, setCreateValue] = useState('');
  const [updated, setUpdated] = useState(false);
  const [options, setOptions] = useState([] as any[]);
  const [component, setComponent] = useState<Component>({
    page: 1,
    query: '',
  } as Component);

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (component.firstOpen || updated) {
      setComponent({
        ...component,
        loading: true,
      });

      fetch({
        page: component.page,
      }).then((data) => {
        setOptions(data);

        setComponent({
          ...component,
          loading: false,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component.firstOpen, updated]);

  return (
    <AutocompleteMUI
      disabled={disabled}
      multiple={multiple}
      limitTags={limitTags}
      disableCloseOnSelect={disableCloseOnSelect}
      options={options}
      defaultValue={data}
      value={inputValue}
      loading={component.loading}
      ref={inputRef}
      sx={{
        '& .MuiChip-label': {
          color: '#616161',
        },
        '& .MuiChip-filled': {
          backgroundColor: '#eeeeee',
        },
        '& .MuiChip-deleteIcon': {
          color: '#1a223f !important',
        },
      }}
      loadingText="Carregando..."
      getLimitTagsText={(more) => `+${more} selecionados`}
      filterOptions={(options, params) => {
        // Options to added new
        if (defaultLast?.create) {
          if (params.inputValue !== '' && options.length === 0) {
            setCreateValue(params.inputValue);
            return [
              ...options,
              { name: `Adicionar novo "${params.inputValue}"` },
            ];
          }

          return options;
        }

        return options;
      }}
      open={component.open}
      onOpen={() => {
        setComponent({
          ...component,
          open: true,
          firstOpen: true,
        });
      }}
      onInputChange={lodash.debounce((event, inputValue) => {
        // Necessary in single option autocomplete
        if (event?.type !== 'change') {
          return;
        }

        setOptions([]);

        setComponent({
          ...component,
          loading: true,
        });

        const query = customOptions.label + '*:' + inputValue;

        fetch({
          page: 1,
          query: query,
        }).then((data) => {
          if (data.length === 0) {
            setComponent({
              ...component,
              loading: false,
              hasMore: false,
              page: 1,
              query: query,
            });

            return;
          }

          setComponent({
            ...component,
            hasMore: true,
            loading: false,
            page: 1,
            query: query,
          });

          setOptions([...data]);
        });
      }, 1000)}
      onClose={() => {
        setComponent({
          ...component,
          open: false,
        });
      }}
      noOptionsText="Não encontramos resultados"
      ListboxProps={{
        onScroll: (event) => {
          if (disabledMore === true) {
            return;
          }

          if (component.hasMore === false) {
            return;
          }

          const listboxNode = event.currentTarget;

          if (
            Math.round(listboxNode.scrollTop) + listboxNode.clientHeight ===
            listboxNode.scrollHeight
          ) {
            const newPage = component.page + 1;

            const query = component.query;

            setComponent({
              ...component,
              page: newPage,
            });

            fetch({
              page: newPage,
              query,
            }).then((data) => {
              if (data.length === 0) {
                setComponent({
                  ...component,
                  hasMore: false,
                });

                return;
              }

              setOptions([...options, ...data]);
            });
          }
        },
      }}
      getOptionLabel={(option: any) => {
        if (option) {
          if (option[customOptions.label]?.indexOf('Adicionar novo') !== -1) {
            return '';
          }
        }

        return option[customOptions.label] || '';
      }}
      onChange={async (_event, data) => {
        // TODO: Bug to list options and unselect and select options
        if (!!data) {
          if (
            multiple &&
            data.length >= 1 &&
            Object.keys(data.at(-1)).length === 1
          ) {
            data.pop();

            setOptions(data);

            if (defaultLast?.create) {
              const response = await defaultLast.create(createValue);
              setOptions([...data, { name: response.name, id: response.id }]);
              setUpdated(!!response.id);
              setInputValue([{ name: response.name, id: response.id }]);
              return;
            }

            setTimeout(() => {
              window.open(window.location.origin + defaultLast?.to, '_blank');
            }, 100);
          }

          if (!multiple && Object.keys(data).length === 1) {
            data = null;
            setOptions([]);

            if (defaultLast?.create) {
              const response = await defaultLast.create(createValue);

              setOptions([{ name: response.name, id: response.id }]);
              setUpdated(!!response.id);
              setInputValue({ name: response.name, id: response.id });
              return;
            }

            setTimeout(() => {
              window.open(window.location.origin + defaultLast?.to, '_blank');
            }, 100);
          }
        }

        setComponent({
          ...component,
          data,
        });
        const option = data ?? null;
        onChange(option, data);
      }}
      isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
      renderOption={(props, option: any, { selected }) => {
        return (
          <li {...props}>
            {multiple && options.length > 1 && (
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            {!multiple && options.length > 1 && (
              <Radio style={{ marginRight: 8 }} checked={selected} />
            )}
            {option[customOptions.label]}
            <br />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={disabled}
          placeholder={placeholder}
          label={label}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};

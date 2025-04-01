/* eslint-disable react/display-name */
import React from 'react';

import 'react-quill/dist/quill.snow.css';
import './styles.scss';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormContext, Controller } from 'react-hook-form';
import { TextFieldProps, Typography } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react';
import { api } from '@/api';
import { enqueueSnackbar } from 'notistack';

type RHFTextFieldProps = TextFieldProps & {
  name: string;
};

const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import('react-quill');
    return ({ forwardedRef, ...props }: any) => (
      <Quill ref={forwardedRef} {...props} />
    );
  },
  { ssr: false },
);

export function RHFTextFieldArea({
  name,
  helperText,
  label,
  placeholder,
  ...rest
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  const quillRef = useRef<any>();

  const onSubmitUploadImage = useCallback(
    async (selectedFile: string | Blob) => {
      if (!selectedFile) {
        console.error('Nenhum arquivo selecionado');
        return;
      }

      const formData = new FormData();

      formData.append('data', selectedFile);

      try {
        const response = await api.uploads.create(formData);

        quillRef?.current
          .getEditor()
          .insertEmbed(
            quillRef.current.getEditor().getSelection().index,
            'image',
            response.url,
          );

        enqueueSnackbar('Imagem adicionada com sucesso', {
          variant: 'success',
        });
      } catch (reason: any) {
        console.log({ reason });
        if (reason === 'Payload Too Large') {
          enqueueSnackbar('A imagem excede os tamnho permitido', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar('Ocorreu um erro ao enviar imagem', {
            variant: 'error',
          });
        }
      }
    },
    [],
  );

  const createImageElement = useCallback(() => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) onSubmitUploadImage(file);
    };
  }, [onSubmitUploadImage]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ align: ['right', 'center', 'justify'] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
        ],
        handlers: {
          image: createImageElement,
        },
      },
    }),
    [createImageElement],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className="text-field-area">
          {field.value && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 1 }}
              >
                <Typography mb={1} variant="body2" fontSize={12}>
                  {label}
                </Typography>
              </motion.div>
            </AnimatePresence>
          )}
          <ReactQuill
            value={field.value}
            forwardedRef={quillRef}
            // @ts-ignore
            onChange={(value) => field.onChange(value)}
            theme="snow"
            placeholder={label}
            modules={modules}
            className="ql-default"
            {...rest}
          />
          {error && (
            <div className="error-message">{error.message || helperText}</div>
          )}
        </div>
      )}
    />
  );
}

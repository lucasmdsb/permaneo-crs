import { useDropzone } from 'react-dropzone';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Iconify } from '@/shared/components/Iconify';
import { UploadProps } from '../types';

const UploadBox = ({
  placeholder,
  error,
  disabled,
  sx,
  ...rest
}: UploadProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      disabled,
      ...rest,
    });

  const hasError = isDragReject || error;

  return (
    <Box
      {...getRootProps()}
      sx={{
        m: 0.5,
        width: 64,
        height: 64,
        flexShrink: 0,
        display: 'flex',
        borderRadius: 1,
        cursor: 'pointer',
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.03),
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.33)}`,
        ...(isDragActive && {
          opacity: 0.9,
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...(hasError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        '&:hover': {
          opacity: 1,
        },
        ...sx,
      }}
    >
      <input {...getInputProps()} />
      {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
    </Box>
  );
};

export default UploadBox;

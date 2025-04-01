import React from 'react';

import { TextField, InputAdornment, StandardTextFieldProps } from '@mui/material';

export interface TextFieldAdornmentCurrencyProps extends StandardTextFieldProps {
  startAdornmentText?: string;
  endAdornmentText?: string;
}

export const TextFieldAdornmentCurrency: React.FC<TextFieldAdornmentCurrencyProps> = ({
  startAdornmentText = 'R$',
  endAdornmentText,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      fullWidth
      InputProps={{
        startAdornment: startAdornmentText && !endAdornmentText && (
          <InputAdornment position="start">{startAdornmentText}</InputAdornment>
        ),
        endAdornment: endAdornmentText && <InputAdornment position="start">{endAdornmentText}</InputAdornment>,
      }}
    />
  );
};

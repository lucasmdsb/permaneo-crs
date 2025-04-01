import React, { useEffect } from 'react';
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
  SourceInfo,
} from 'react-number-format';

import { StandardTextFieldProps } from '@mui/material';

import {
  TextFieldAdornmentCurrency,
  TextFieldAdornmentCurrencyProps,
} from './TextFieldAdornmentCurrency';

type TextFieldPriceProps = (NumberFormatProps | StandardTextFieldProps) &
  TextFieldAdornmentCurrencyProps & {
    onValueChange: (values: NumberFormatValues, sourceInfo: SourceInfo) => void;
  };

export function RHFTextFieldPrice({
  onValueChange,
  value,
  defaultValue,
  ...rest
}: TextFieldPriceProps) {
  const [internalValue, setInternalValue] = React.useState('');

  const formatCurrency = (value: any) => {
    if (!Number(value)) return '';

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return amount.format(value / 100).replace('R$', '');
  };

  useEffect(() => {
    setInternalValue(formatCurrency(((value ?? defaultValue) as any) * 100));
  }, [value, defaultValue]);

  return (
    // ! Don't use ts-ignore.
    // @ts-ignore
    <NumberFormat
      {...rest}
      value={internalValue}
      customInput={TextFieldAdornmentCurrency}
      fixedDecimalScale
      decimalSeparator=","
      decimalScale={2}
      type="text"
      format={formatCurrency}
      thousandSeparator="."
      allowNegative={false}
      onValueChange={(values, sourceInfo) => {
        setInternalValue(values.value);
        onValueChange(
          { ...values, floatValue: values.floatValue! / 100 },
          sourceInfo,
        );
      }}
    />
  );
}

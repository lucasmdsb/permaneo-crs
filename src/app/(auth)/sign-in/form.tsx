import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';

import {
  Link,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Alert,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormProvider } from '@/shared/components/Form';
import { RHFTextField } from '@/shared/components/TextField';
import { useBoolean } from '@/hooks/tools/boolean.tool';
import { useAuth } from '@/hooks/auth';
import { resolver, Yup } from '@/shared/lib/yup';

export function SignInForm() {
  const password = useBoolean();
  const [errorMsg, setErrorMsg] = useState<string>();
  const { login } = useAuth();

  const [checked, setChecked] = useState(true);

  const formValidator = resolver(
    Yup.object().shape({
      email: Yup.string().email().max(100).required(),
      password: Yup.string().required().max(100).min(8),
    }),
  );

  const methods = useForm({
    resolver: formValidator,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      setErrorMsg(
        'E-mail ou senha incorretas. Verifique as informações e tente novamente.',
      );
    }
  });

  return (
    <FormProvider onSubmit={onSubmit} methods={methods}>
      <Stack spacing={2}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField
          name="email"
          label="E-mail"
          type="email"
          autoCapitalize="none"
        />

        <RHFTextField
          name="password"
          label="Senha"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  {password.value ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label="Mantenha-me logado"
            />
          </Grid>
          <Grid item>
            <Link
              variant="subtitle1"
              color="secondary"
              sx={{ textDecoration: 'none' }}
              href="#"
            >
              Esqueceu sua senha?
            </Link>
          </Grid>
        </Grid>

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Acessar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

const errors = {
  USER_ALREADY_EXISTS:
    'Já existe um usuário registrado com esse endereço de email',
  CANDIDATE_ALREADY_EXISTS:
    'Já existe um candidato registrado com esse endereço de email',
  ENROLLMENT_ALREADY_EXISTS:
    'Ocorreu um erro, verifique se você já está na registrado nessa vaga antes de continuar',
  EASY_ENROLLMENT_ALREADY_EXISTS:
    'Ocorreu um erro, caso você já possua conta na plataforma com esse e-mail, acesse para se candidatar',
};

export function getErrorMessage(messageCode: string) {
  return (
    errors[messageCode as keyof typeof errors] || 'Ocorreu um erro inesperado.'
  );
}

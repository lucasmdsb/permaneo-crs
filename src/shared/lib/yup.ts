import * as Yup from 'yup';
import { yupResolver as resolver } from '@hookform/resolvers/yup';

Yup.setLocale({
  mixed: {
    default: 'Valor inválido',
    required: 'Campo obrigatório',
    oneOf: 'Deve ser um dos seguintes valores: ${values}',
    notOneOf: 'Não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'Deve conter exatamente ${length} caracteres',
    min: 'Deve ter pelo menos ${min} caracteres',
    max: 'Deve ter no máximo ${max} caracteres',
    email: 'Formato de e-mail inválido',
    url: 'Deve conter uma URL válida',
    trim: 'Não deve conter espaços no início ou no fim',
    lowercase: 'Deve estar em minúsculas',
    uppercase: 'Deve estar em maiúsculas',
    matches: 'Deve corresponder ao padrão: ${regex}',
  },
  boolean: {
    isValue: 'Deve ser um valor booleano',
  },
  number: {
    min: 'Deve ser no mínimo ${min}',
    max: 'Deve ser no máximo ${max}',
    lessThan: 'Deve ser menor que ${less}',
    moreThan: 'Deve ser maior que ${more}',
    positive: 'Deve ser um número positivo',
    negative: 'Deve ser um número negativo',
    integer: 'Deve ser um número inteiro',
  },
  date: {
    min: 'Deve ser uma data maior que ${min}',
    max: 'Deve ser uma data menor que ${max}',
  },
  array: {
    min: 'Deve conter pelo menos ${min} itens',
    max: 'Deve conter no máximo ${max} itens',
  },
});

Yup.addMethod(Yup.string, 'cpf', function (message = 'CPF inválido') {
  return this.test('cpf', message, function (value) {
    if (!value) {
      return true;
    }

    const cleanedCPF = value.replace(/[^\d]/g, '');

    if (cleanedCPF.length !== 11) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
      return false;
    }

    return true;
  });
});

Yup.addMethod(Yup.string, 'cnpj', function (message = 'CNPJ inválido') {
  return this.test('cnpj', message, function (value) {
    if (!value) {
      return true;
    }

    const cleanedCnpj = value.replace(/[^\d]/g, '');

    if (cleanedCnpj.length !== 14) {
      return false;
    }

    const cnpjArray = Array.from(cleanedCnpj, Number);
    const calcDigit = (cnpjArray: any, pos: number) => {
      const slice = cnpjArray.slice(0, pos);
      let factor = pos - 7;
      let sum = 0;

      for (let i = pos; i >= 1; i--) {
        sum += slice[pos - i] * factor--;
        if (factor < 2) {
          factor = 9;
        }
      }

      const remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return remainder === cnpjArray[pos];
    };

    if (!calcDigit(cnpjArray, 12) || !calcDigit(cnpjArray, 13)) {
      return false;
    }

    return true;
  });
});

Yup.addMethod(Yup.string, 'phone', function (message = 'Telefone inválido') {
  return this.test('phone', message, function (value) {
    const phoneRegex = /^\d{10,11}$/;

    if (value && !phoneRegex.test(value)) {
      return false;
    }

    return true;
  });
});

export { Yup, resolver };

import { AddressData } from '@/schema';
import { dayjs } from './day-js';

export function formatDate(date: Date, format = 'DD/MM/YYYY') {
  return dayjs(new Date(date)).format(format);
}

export function formatAddress(address?: AddressData): string {
  if (!address) return 'Não preenchido';
  return `${address?.street} ${address?.number}, ${address?.city} - ${address?.state} / CEP: ${address?.postalCode}`;
}

export function formatPhone(phone?: string) {
  if (!phone) return 'Não preenchido';
  return phone
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
}

export function formatPrice(value: number) {
  if (typeof value !== 'number') return null;

  return new Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}

import NextLink from 'next/link';

import { Logo } from '@/shared/components/Logo';

export const LogoSection = () => (
  <NextLink href="/" aria-label="logo permaneo">
    <Logo />
  </NextLink>
);

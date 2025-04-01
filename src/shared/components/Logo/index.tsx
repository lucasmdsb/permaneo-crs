import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/assets/images/logo.png"
      alt="logo-permaneo-cursos"
      width={150}
      height={37.5}
    />
  );
}

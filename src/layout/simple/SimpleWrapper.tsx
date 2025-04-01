'use client';

import { styled } from '@mui/material/styles';
import { AppBar } from '@/shared/components/AppBar';
import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  banner?: string;
  avatar?: string;
  colorPrimary?: string;
}

export function SimpleWrapper({
  children,
  banner,
  avatar,
  colorPrimary,
}: Props) {
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerBackground = banner ?? '/assets/_mock/banner.png';

  const HeaderWrapper = styled('div')(() => ({
    backgroundImage: `url(${headerBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: 400,
    marginTop: headerHeight,
  }));

  useEffect(() => {
    const header = document.querySelector('#home > header');

    if (header) {
      setHeaderHeight(header.clientHeight);
    }
  }, []);

  return (
    <Box flex={1}>
      <HeaderWrapper id="home">
        <AppBar avatar={avatar} colorPrimary={colorPrimary} />
      </HeaderWrapper>
      <Container>{children}</Container>
    </Box>
  );
}

'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { WalletProvider } from '@/lib/WalletContext';

export function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WalletProvider>
        {props.children}
      </WalletProvider>
    </ThemeProvider>
  );
}


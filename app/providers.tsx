'use client';

import { base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{ 
          appearance: { 
            mode: 'auto',
          }
        }}
      >
        {props.children}
      </OnchainKitProvider>
    </ThemeProvider>
  );
}


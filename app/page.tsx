// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSession, saveSession, SessionData } from '../lib/session';

// Define a type for the custom window property
interface CustomWindow extends Window {
  handleConnect?: (address: string, basename?: string) => void;
}

declare const window: CustomWindow;

export default function Home() {
  const [wallet, setWallet] = useState<SessionData>(getSession());

  useEffect(() => {
    window.handleConnect = (address: string, basename?: string) => {
      const sessionData: SessionData = { address, basename };
      setWallet(sessionData);
      saveSession(sessionData);
    };

    // Cleanup on unmount
    return () => {
      window.handleConnect = undefined;
    };
  }, []);

  const handleDisconnect = () => {
    setWallet({});
    window.handleConnect = undefined;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        address={wallet.address}
        basename={wallet.basename}
        onDisconnect={handleDisconnect}
      />
      <main className="flex-grow p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-secondary">Welcome to My DApp</h2>
        {wallet.address ? (
          <p className="text-lg">
            Connected as{' '}
            <span className="font-semibold">
              {wallet.basename || wallet.address}
            </span>
          </p>
        ) : (
          <p className="text-lg">Please connect your wallet to continue.</p>
        )}
      </main>
      <footer className="p-4 bg-secondary text-white text-center">
        <p>© 2025 My DApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
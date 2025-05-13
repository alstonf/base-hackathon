// components/Header.tsx
'use client';

import { useState } from 'react';
import WalletPopup from './WalletPopup';
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { clearSession } from '../lib/session';

// Define a type for the custom window property
interface CustomWindow extends Window {
  handleConnect?: (address: string, basename?: string) => void;
}

declare const window: CustomWindow;

interface HeaderProps {
  address?: string;
  basename?: string;
  onDisconnect: () => void;
}

export default function Header({ address, basename, onDisconnect }: HeaderProps) {
  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);

  const handleDisconnect = () => {
    clearSession();
    onDisconnect();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-secondary text-white shadow-md">
      <h1 className="text-2xl font-bold">My DApp</h1>
      <div className="flex items-center">
        {address ? (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 rounded-full" />
            <div className="flex flex-col">
              <Name className="text-white font-semibold" />
              <span className="text-sm text-gray-300">
                {basename || (address.slice(0, 6) + '...' + address.slice(-4))}
              </span>
            </div>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setIsWalletPopupOpen(true)}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <WalletPopup
        isOpen={isWalletPopupOpen}
        onClose={() => setIsWalletPopupOpen(false)}
        onConnect={(address, basename) => {
          setIsWalletPopupOpen(false);
          window.handleConnect?.(address, basename);
        }}
      />
    </header>
  );
}
'use client';

import { useState } from 'react';
import { useWallet } from '@/lib/WalletContext';

export function ProfileAvatar() {
  const { address, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!address) return null;

  const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 rounded-full bg-gray-100 dark:bg-gray-800 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
          {address.slice(2, 4).toUpperCase()}
        </div>
        <span className="text-sm dark:text-white">{shortenedAddress}</span>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                disconnect();
                setIsMenuOpen(false);
              }}
              className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
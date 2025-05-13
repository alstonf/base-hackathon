// components/Header.tsx
'use client';

import { useState } from 'react';
import WalletPopup from './WalletPopup';
import { 
  Avatar, 
  Name, 
  Address, 
  EthBalance,
  Identity 
} from '@coinbase/onchainkit/identity';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDisconnect = () => {
    clearSession();
    onDisconnect();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-secondary text-white shadow-md">
      <h1 className="text-2xl font-bold">My DApp</h1>
      <div className="flex items-center">
        {address ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors"
            >
              <Avatar className="h-10 w-10 rounded-full" />
              <div className="flex flex-col items-start">
                <Name className="text-white font-semibold" />
                <div className="flex items-center space-x-2">
                  <EthBalance className="text-sm text-gray-300" />
                  <span className="text-sm text-gray-300">
                    {basename || (address.slice(0, 6) + '...' + address.slice(-4))}
                  </span>
                </div>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
                <Identity className="px-4 py-3 border-b border-gray-700" hasCopyAddressOnClick>
                  <Avatar className="h-16 w-16" />
                  <div className="flex flex-col space-y-1">
                    <Name className="text-lg font-semibold" />
                    <Address className="text-sm text-gray-300" />
                    <EthBalance className="text-sm text-gray-300" />
                  </div>
                </Identity>
                
                <div className="space-y-2 mt-3">
                  <button
                    onClick={() => window.open('https://etherscan.io/address/' + address, '_blank')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded text-sm"
                  >
                    View on Explorer
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(address);
                      // You could add a notification here
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded text-sm"
                  >
                    Copy Address
                  </button>
                  <button
                    onClick={() => {
                      handleDisconnect();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded text-sm text-red-400"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
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
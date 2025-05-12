// components/WalletPopup.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WalletPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string, basename?: string) => void;
}

export default function WalletPopup({ isOpen, onClose, onConnect }: WalletPopupProps) {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (connectedAddress) {
      const fetchBasename = async () => {
        try {
          const response = await fetch(`/api/basename?address=${connectedAddress}`);
          const data = await response.json();
          if (data.error) throw new Error(data.error);
          onConnect(connectedAddress, data.basename);
        } catch (error) {
          console.error('Failed to fetch Basename:', error);
          onConnect(connectedAddress, connectedAddress); // Fallback to address
        }
        onClose();
      };
      fetchBasename();
    }
  }, [connectedAddress, onConnect, onClose]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setConnectedAddress(accounts[0]);
          setError(null);
        }
      } catch (error: unknown) {
        console.error('Wallet connection failed:', error);
        setError('Failed to connect wallet. Please try again.');
      }
    } else {
      setError('No Ethereum provider found. Please install a wallet like MetaMask or Coinbase Wallet.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-secondary">Select Wallet</h2>
        <div className="space-y-3">
          <button
            className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
            onClick={connectWallet}
          >
            <Image
              src="/metamask-icon.png"
              alt="MetaMask"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span>MetaMask</span>
          </button>
          <button
            className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
            onClick={connectWallet}
          >
            <Image
              src="/coinbase-icon.png"
              alt="Coinbase Wallet"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span>Coinbase Wallet</span>
          </button>
          <button
            className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
            onClick={connectWallet}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Other Wallet</span>
          </button>
        </div>
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
        <button
          className="mt-4 w-full bg-gray-300 text-secondary px-4 py-2 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
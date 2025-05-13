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
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string; sender: 'user' | 'system'}>>([]);

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMessage('');
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! This is a demo response.", 
        sender: 'system' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        address={wallet.address}
        basename={wallet.basename}
        onDisconnect={handleDisconnect}
      />
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-secondary animate-slide-up">
            Welcome to My DApp
          </h2>
          
          <div className="mt-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-bounce-in">
            <div className="mb-4 h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg animate-fade-in ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white ml-auto max-w-[80%]'
                      : 'bg-gray-200 dark:bg-gray-700 mr-auto max-w-[80%]'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer className="p-4 bg-secondary text-white text-center">
        <p>© 2025 My DApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
// lib/session.ts
export interface SessionData {
  address?: string;
  basename?: string;
}

export const saveSession = (data: SessionData) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('wallet_session', JSON.stringify(data));
  }
};

export const getSession = (): SessionData => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('wallet_session');
    return data ? JSON.parse(data) : {};
  }
  return {};
};

export const clearSession = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('wallet_session');
  }
};
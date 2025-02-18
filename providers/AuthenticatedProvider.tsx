import React, { useState, createContext, useContext } from 'react';

interface AuthenticatedContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthenticatedContext = createContext<AuthenticatedContextProps | undefined>(undefined);

interface AuthenticatedProviderProps {
  children: React.ReactNode;
}

export const AuthenticatedProvider: React.FC<AuthenticatedProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenticatedContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthenticatedProvider");
  }
  return context;
};
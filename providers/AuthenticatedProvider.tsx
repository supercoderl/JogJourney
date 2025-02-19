import React, { useState, createContext, useContext } from 'react';

interface AuthenticatedContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userInformation: any;
  setUserInformation: React.Dispatch<React.SetStateAction<any>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticatedContext = createContext<AuthenticatedContextProps | undefined>(undefined);

interface AuthenticatedProviderProps {
  children: React.ReactNode;
}

export const AuthenticatedProvider: React.FC<AuthenticatedProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInformation, setUserInformation] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AuthenticatedContext.Provider value={{ user, setUser, userInformation, setUserInformation, isChecked, setIsChecked }}>
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
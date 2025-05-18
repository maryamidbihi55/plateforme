
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  activeSpace: "client" | "societe" | "agent" | "admin" | null;
  setActiveSpace: (space: "client" | "societe" | "agent" | "admin" | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSpace, setActiveSpace] = useState<"client" | "societe" | "agent" | "admin" | null>(null);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, activeSpace, setActiveSpace }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

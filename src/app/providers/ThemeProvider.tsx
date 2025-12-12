import React, { createContext, useContext } from 'react';
import { colors } from '../../theme/colors';

// Simple Context to allow switching themes in the future
const ThemeContext = createContext({ colors });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
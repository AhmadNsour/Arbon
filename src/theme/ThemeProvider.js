// ThemeProvider.js
import React, {createContext, useContext, useState} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = !isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, setIsDarkMode, isDarkMode}}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

import React, {createContext, useContext} from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from './themes';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '@store/actions/settingsActions';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const theme = settings.isDarkMode ? darkTheme : lightTheme;
  const isDarkMode = settings.isDarkMode;

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        settings,
        toggleThemeMode,
        isDarkMode,
      }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

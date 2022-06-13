import _ from 'lodash';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components';

import { theme } from '../design/theme'

export const ScreenThemeContext = React.createContext({});

export default function ScreenThemeProvider({ children }) {
  const [screenTheme, setScreenTheme] = React.useState(null);
  const [finalTheme, setFinalTheme] = React.useState(theme);

  React.useEffect(() => {
    AsyncStorage.getItem('screenTheme').then(value => {
      if (value) {
        setScreenTheme(value)
        setFinalTheme({...theme, screenTheme: value})
      } else {
        setScreenTheme('dark')
        setFinalTheme({...theme, screenTheme: 'dark'})
      }
    });
  }, [])

  React.useEffect(() => {
    AsyncStorage.setItem('screenTheme', screenTheme);
  }, [screenTheme])

  function handleScreenTheme(value) {
    if (!value) {
      setScreenTheme('light')
      setFinalTheme({...theme, screenTheme: 'light'})
    } else {
      setScreenTheme('dark')
      setFinalTheme({...theme, screenTheme: 'dark'})
    }
  }

  return (
    <ScreenThemeContext.Provider value={{ 
      screenTheme, 
      setScreenTheme, 
      handleScreenTheme
    }}>
      <ThemeProvider theme={finalTheme}>
        {children}
      </ThemeProvider>
    </ScreenThemeContext.Provider>
  )
}
import _ from 'lodash';
import React from 'react'
import { AsyncStorage } from 'react-native';

export const ScreenThemeContext = React.createContext({});

export default function ScreenThemeProvider({ children }) {
  const [screenTheme, setScreenTheme] = React.useState(null);

  React.useEffect(() => {
    AsyncStorage.getItem('screenTheme').then(value => {
      console.log(value)
      if (value) {
        setScreenTheme(value)
      } else {
        setScreenTheme('dark')
      }
    })
  }, [])

  React.useEffect(() => {
    AsyncStorage.setItem('screenTheme', screenTheme);
  }, [screenTheme])

  function handleScreenTheme() {
    if (screenTheme === 'dark') {
      setScreenTheme('light')
    } else {
      setScreenTheme('dark')
    }
  }

  return (
    <ScreenThemeContext.Provider value={{ 
      screenTheme, setScreenTheme, handleScreenTheme
    }}>
      {children}
    </ScreenThemeContext.Provider>
  )
}
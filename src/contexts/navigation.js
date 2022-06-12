import React from 'react'

import { useNavigation } from '@react-navigation/native'

export const NavigationContext = React.createContext({});

export default function NavigationProvider({ children }) {
  const navigation = useNavigation();

  function navigate(to, props) {
    navigation.navigate(String(to), props);
  }  

  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  )
}
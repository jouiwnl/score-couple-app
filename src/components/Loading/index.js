import React from 'react'
import { ActivityIndicator } from 'react-native';
import { ScreenThemeContext } from '../../contexts/theme';

import { LoadingWrapper } from './styles';

export default function({ size, fullwidth }) {

  const { screenTheme } = React.useContext(ScreenThemeContext);

  return (
    <LoadingWrapper fullwidth={fullwidth}>
      <ActivityIndicator 
        size={size} 
        color={screenTheme === 'dark' ? "white" : "black"} 
      />
    </LoadingWrapper>
  )
}
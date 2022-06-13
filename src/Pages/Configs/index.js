import React from 'react'

import { 
  Wrapper,
  HeaderWrapper,
  HeaderTitle,
  ConfigsWrapper,
  ConfigItem,
} from './styles'

import ConfigAvatar from '../../components/ConfigAvatar';
import { ScreenThemeContext } from '../../contexts/theme';

export default function() {

  const { screenTheme } = React.useContext(ScreenThemeContext) 

  return (
    
      <Wrapper>
        
        <HeaderWrapper>
          <HeaderTitle screenTheme={screenTheme}>Configurações</HeaderTitle>
        </HeaderWrapper>

        <ConfigAvatar />
        
      </Wrapper>
  )
}
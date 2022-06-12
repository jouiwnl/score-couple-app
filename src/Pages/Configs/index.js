import React from 'react'

import { 
  Wrapper,
  HeaderWrapper,
  HeaderTitle,
  ConfigsWrapper,
  ConfigItem,
} from './styles'

import ConfigAvatar from '../../components/ConfigAvatar';

export default function() {

  return (
    
      <Wrapper>
        
        <HeaderWrapper>
          <HeaderTitle>Configurações</HeaderTitle>
        </HeaderWrapper>

        <ConfigAvatar />
        
      </Wrapper>
  )
}
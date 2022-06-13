import React from 'react'

import { 
  Wrapper,
  HeaderWrapper,
  HeaderTitle,
  ConfigsWrapper,
  ConfigSection,
  SectionTitle,
  ConfigItem,
  ConfigItemTitle
} from './styles'

import ConfigAvatar from '../../components/ConfigAvatar';
import { Switch } from 'react-native';
import { ScreenThemeContext } from '../../contexts/theme';

export default function() {
  const { screenTheme, handleScreenTheme } = React.useContext(ScreenThemeContext);

  return (
    
      <Wrapper>
        
        <HeaderWrapper>
          <HeaderTitle>Configurações</HeaderTitle>
        </HeaderWrapper>

        <ConfigAvatar />

        <ConfigsWrapper>
          <ConfigSection>
            <SectionTitle>Aparência</SectionTitle>

            <ConfigItem>
              <ConfigItemTitle>Dark mode</ConfigItemTitle>

              <Switch 
                trackColor={{ false: '#464646', true: '#CF2400' }}
                thumbColor={screenTheme === 'dark' ? '#7C1600' : '#9B9B9B'}
                style={{ height: 40 }}
                value={screenTheme === 'dark' ? true : false}
                onValueChange={handleScreenTheme}
              />
            </ConfigItem>
          </ConfigSection>
        </ConfigsWrapper>
        
      </Wrapper>
  )
}
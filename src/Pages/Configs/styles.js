import styled from 'styled-components/native'

import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme, screenTheme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.BACKGROUND_DARK
    }

    return theme.COLORS.BACKGROUND_LIGHT
  }};
  padding-top: ${statusBarHeight + 'px'};
  flex: 1;
  height: 80%;
`;

export const HeaderWrapper = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 14px;
`

export const HeaderTitle = styled.Text`
  font-size: 23px;
  font-weight: 600;
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`

export const ConfigsWrapper = styled.View`

`

export const ConfigItem = styled.View`

`
import styled from 'styled-components/native'

import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
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
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`

export const ConfigsWrapper = styled.ScrollView`

`

export const ConfigItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: auto;

  padding-right: 10px;
  padding-left: 10px;

  border-bottom-color: #464646;
  border-bottom-width: 0.7px;
`

export const ConfigItemTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;

  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`

export const ConfigSection = styled.View`
  flex-direction: column;
`

export const SectionTitle = styled.Text`
  font-size: 23px;
  font-weight: 700;
  padding: 14px;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`
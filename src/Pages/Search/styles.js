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
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
`;

export const InputWrapper = styled.View`
  left: 0px;
  z-index: 999;
  border: none;
  height: 60px;
  padding-left: 20px;
  width: 100%;
  font-size: 15px;
  background: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return 'rgb(75, 78, 90)';
    }

    return 'rgb(199, 199, 199)';
  }};
  flex-direction: row;
  align-items: center;
`

export const Input = styled.TextInput`
  margin-left: 10px;
  flex: 1;
  padding-right: 10px;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`
export const AlertWrapper = styled.View`
  padding: 25px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  line-height: 20.4px;
  font-size: 17px;
  text-align: center;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`

export const ListMedias = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  }
}))`
  padding: 15px;
`

export const MediaTypeButton = styled.TouchableOpacity`
  width: 80px;
  padding: 10px;
`

export const MediaTypeButtonLabel = styled.Text`
  justify-content: space-between;
  margin-right: 5px;
  font-size: 10px;
  opacity: 0.7;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`



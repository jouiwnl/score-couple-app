import styled from 'styled-components/native'
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height;

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme, screenTheme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.BACKGROUND_DARK
    }

    return theme.COLORS.BACKGROUND_LIGHT
  }};
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
`;

export const MovieImage = styled.ImageBackground`
  width: 100%;
  height: ${() => {
    if (windowHeight > 800) {
      return (windowHeight/100) * 30 + 'px';
    }

    return (windowHeight/100) * 20 + 'px';  
  }};
  z-index: -10;
`
export const Main = styled.ScrollView`
  width: 100%;
  flex: 1;
`
export const MovieTitle = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
`
export const MovieDescription = styled.Text`
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;
  font-weight: 300;
  color: #464646;
  text-align: center;
  margin-top: 15px;
`

export const SaveButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.INPUT_COLOR};
  width: 170px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const CancelButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  border: ${({ theme }) => `2px solid ${theme.COLORS.INPUT_COLOR}`};
  background-color: transparent;
  width: 170px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const ButtonLabel = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`

export const Footer = styled.View`
  width: 100%;
  display: flex;
  flex: 0.5;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

export const SetStatusButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const SetStatusButton = styled.TouchableOpacity`
  background: transparent;
  width: 125px;
  border: 1px solid ${props => props.color};
  border-radius: 7px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalWrapper = styled.ScrollView`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ModalStatusHeader = styled.Text`
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-weight: 600;
  font-size: 25px;
  padding: 10px;
  text-align: center;
`

export const ModalItemWrapper = styled.TouchableOpacity`
  width: 90%;
  margin: auto;
  height: 30px;
  border-bottom-color: #464646;
  border-bottom-width: 1px;
  margin-top: 30px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ModalItemIcon = styled.View`
  margin-top: -20px;
  margin-right: 15px;
`
export const ModalItemDescription = styled.Text`
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-size: 17px;
  font-weight: 400;
  margin-top: -25px;
  margin-left: 10px;
`

export const StatusLabel = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 700;
`

export const ProvidersWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ProviderLogo = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 8px;
  margin-left: 10px;
  margin-right: 10px;
`
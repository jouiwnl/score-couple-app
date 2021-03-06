import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

export const Main = styled.View`
`

export const Wrapper = styled.ScrollView`
  display: flex;
  flex: 1;
`

const windowHeight = Dimensions.get('window').height;

export const MediaImage = styled.ImageBackground`
  width: 100%;
  height: ${() => {
    if (windowHeight > 800) {
      return (windowHeight/100) * 30 + 'px';
    }

    return (windowHeight/100) * 20 + 'px';  
  }};
  z-index: -10;
  border-radius: 10px;
  
`

export const MediaTitle = styled.Text`
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-size: 35px;
  font-weight: 500;
  text-align: center;
`

export const MediaDescription = styled.Text`
  color: #464646;
  font-size: 12px;
  margin-top: 5px;
  padding: 15px;
  text-align: center;
`

export const MediaRating = styled.View`
  margin-top: 15px;
  width: ${() => {
    const windowWidth = Dimensions.get('screen').width;
    return windowWidth + 'px'
  }};

  margin-left: ${() => {
    const windowWidth = Dimensions.get('screen').width;
    return (windowWidth/4) + 'px'
  }}
`

export const ButtonStatusLabel = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 700;
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
  flex-direction: column;
  height: 300px;
`

export const ModalStatusHeader = styled.Text`
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
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
  border-bottom-width: 0.5px;
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
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-size: 17px;
  font-weight: 400;
  margin-top: -25px;
  margin-left: 10px;
`

export const ProvidersWrapper = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
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

export const FooterWrapper = styled.View`
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SaveButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.INPUT_COLOR};
  width: 130px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const DeleteButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  border: ${({ theme }) => `2px solid ${theme.COLORS.INPUT_COLOR}`};
  background-color: transparent;
  width: 130px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const ButtonLabel = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
`
import styled from 'styled-components/native'

export const Wrapper = styled.ScrollView`
  width: 100%;
  padding: 20px;
`

export const ModalHeader = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};

  text-align: center;
`
export const MediaInformation = styled.ScrollView`

`
export const Footer = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`

export const MediaDescription = styled.Text`
  font-size: 14px;
  color: #464646;
  font-weight: 300;
  text-align: center;
  padding: 10px;
`

export const SaveButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.INPUT_COLOR};
  width: 130px;
  text-align: center;
  justify-content: center;
  align-items: center;

  opacity: ${props => props.isDisabled ? 0.3 : 1};
`

export const CancelButton = styled.TouchableOpacity`
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

  text-align: center;
`

export const MediaExistIndicatorWrapper = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MediaExistIndicator = styled.View`
  margin-top: 20px;
  border: 1px solid #464646;
  border-radius: 10px;
  width: 75px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const MediaExistIndicatorLabel = styled.Text`
  color: #464646;
  font-size: 10px;
  padding: 2px;
`

export const ProvidersWrapper = styled.View`
  width: 100%;
  margin-top: 10px;
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
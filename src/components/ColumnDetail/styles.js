import styled from 'styled-components/native'

export const Wrapper = styled.View`
  padding: 20px;
`

export const TitleColumn = styled.Text`
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`

export const Header = styled.View`

`

export const Input = styled.TextInput`
  border: ${({ theme }) => `2px solid ${theme.COLORS.INPUT_COLOR}`};
  border-radius: 10px;
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  height: 60px;
  font-size: 15px;
  padding-left: 15px;
`
export const Form = styled.View`
  margin-top: 40px;
`

export const FooterWrapper = styled.View`
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-top: 20px;
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
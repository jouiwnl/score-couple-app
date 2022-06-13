import styled from 'styled-components/native'

export const Wrapper = styled.View`
  padding: 20px;
`

export const TitleColumn = styled.Text`
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
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
  color: ${({ screenTheme, theme }) => {
    if (screenTheme === 'dark') {
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
export const Footer = styled.View`

`
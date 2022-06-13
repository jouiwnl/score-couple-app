import styled from 'styled-components/native'

export const Card = styled.View`
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return `1px dashed ${theme.COLORS.FONT_COLOR_DARK}`
    }

    return `1px dashed ${theme.COLORS.FONT_COLOR_LIGHT}`
  }}; ;

  background-color: transparent;
`

export const WrapperButton = styled.TouchableOpacity`
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonLabel = styled.Text`
  color: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.FONT_COLOR_DARK
    }

    return theme.COLORS.FONT_COLOR_LIGHT
  }};
  font-weight: 300;
  font-size: 12px;
`
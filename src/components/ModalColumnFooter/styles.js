import styled from 'styled-components/native'

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

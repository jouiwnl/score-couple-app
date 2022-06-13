import styled from 'styled-components/native'

export const RowWrapper = styled.View``

export const RowTitle = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => {
  if (theme.screenTheme === 'dark') {
    return theme.COLORS.FONT_COLOR_DARK
  }

  return theme.COLORS.FONT_COLOR_LIGHT
}};
`

export const RowItems = styled.ScrollView.attrs({
  horizontal: true
})`
  padding: 8px 0 24px;
`

export const RowHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`

export const RowButton = styled.TouchableOpacity`
  padding-right: 14px;
`
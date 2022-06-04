import styled from 'styled-components/native'

export const RowWrapper = styled.View``

export const RowTitle = styled.Text`
  font-size: 20px;
  color: #fff;
`

export const RowItems = styled.ScrollView.attrs({
  horizontal: true
})`
  padding: 8px 0 24px;
`
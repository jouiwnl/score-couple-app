import styled from 'styled-components/native'

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
  background-color: #9D2208;
  width: 130px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const DeleteButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #9D2208;
  background-color: transparent;
  width: 130px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const ButtonLabel = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`

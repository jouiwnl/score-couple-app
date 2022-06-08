import styled from 'styled-components/native'

export const Card = styled.View`
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border: 1px dashed #fff;

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
  color: #fff;
  font-weight: 300;
  font-size: 12px;
`
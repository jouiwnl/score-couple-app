import styled from 'styled-components/native'

export const Wrapper = styled.View`
  width: 100%;
  padding: 20px;
`

export const ModalHeader = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: #fff;

  text-align: center;
`
export const MovieInformation = styled.View`

`
export const Footer = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 40px;
`

export const MovieTitle = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  text-align: center;

  margin-top: 40px;
`

export const MovieDescription = styled.Text`
  font-size: 14px;
  color: #464646;
  font-weight: 300;
  margin-top: 10px;
  text-align: center;
  padding: 10px;
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

export const CancelButton = styled.TouchableOpacity`
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
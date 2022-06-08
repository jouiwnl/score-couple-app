import styled from 'styled-components/native'

export const Main = styled.View`
`

export const Wrapper = styled.View`
  height: 680px;
  display: flex;
`

export const MovieTitle = styled.Text`
  color: #fff;
  font-size: 35px;
  font-weight: 500;
  text-align: center;
`

export const MovieDescription = styled.Text`
  color: #464646;
  font-size: 12px;
  margin-top: 5px;
  padding: 15px;
  text-align: center;
`

export const MovieRating = styled.View`
  margin-bottom: 20px;
`

export const ButtonLabel = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 700;
`

export const SetStatusButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const SetStatusButton = styled.TouchableOpacity`
  background: transparent;
  width: 125px;
  border: 1px solid ${props => props.color};
  border-radius: 7px;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalWrapper = styled.ScrollView`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ModalStatusHeader = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 25px;
  padding: 10px;
  text-align: center;
`

export const ModalItemWrapper = styled.TouchableOpacity`
  width: 90%;
  margin: auto;
  height: 30px;
  border-bottom-color: #464646;
  border-bottom-width: 1px;
  margin-top: 30px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ModalItemIcon = styled.View`
  margin-top: -20px;
  margin-right: 15px;
`
export const ModalItemDescription = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 400;
  margin-top: -25px;
  margin-left: 10px;
`
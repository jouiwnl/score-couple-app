import styled from 'styled-components/native'
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: #000014;
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
`;

export const MovieImage = styled.ImageBackground`
  width: 100%;
  height: 250px;
  z-index: -999;
`
export const Main = styled.View`
  width: 100%;
  height: 40%;
`
export const MovieTitle = styled.Text`
  font-size: 35px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: 20px;
`
export const MovieDescription = styled.Text`
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;
  font-weight: 300;
  color: #464646;
  text-align: center;
  margin-top: 15px;
`
export const MovieRating = styled.View`
  margin-top: -15px;
`

export const SaveButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  background-color: #9D2208;
  width: 170px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const CancelButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #9D2208;
  background-color: transparent;
  width: 170px;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const ButtonLabel = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: #fff;
`

export const Footer = styled.View`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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

export const StatusLabel = styled.Text`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 700;
`
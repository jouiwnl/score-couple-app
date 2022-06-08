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

export const Input = styled.TextInput`
  left: 0px;
  z-index: 999;
  border: none;
  background: rgb(75, 78, 90);
  color: rgb(168, 169, 173);
  height: 60px;
  padding-left: 24px;
  width: 100%;
  font-size: 15px;
`
export const AlertWrapper = styled.View`
  padding: 25px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Message = styled.Text`
  line-height: 20.4px;
  font-size: 17px;
  text-align: center;
  color: #fff;
`

export const ListMovies = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  }
}))`
  padding: 15px;
`



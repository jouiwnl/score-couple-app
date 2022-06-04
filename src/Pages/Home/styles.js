import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

console.log(Platform.OS)

export const Wrapper = styled.SafeAreaView`
  background: #000014;
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
`;

export const Container = styled.View`
  padding-left: 14px;
`;
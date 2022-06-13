import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme }) => theme.COLORS.BACKGROUND_DARK};
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
  justify-content: center;
  align-items: center;
`;

export const Heading = styled.Text`
  color: #bf94ff;
  font-size: 30px;
`;
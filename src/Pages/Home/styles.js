import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme }) => {
    if (theme.screenTheme === 'dark') {
      return theme.COLORS.BACKGROUND_DARK
    }

    return theme.COLORS.BACKGROUND_LIGHT
  }};
  
  flex: 1;
  padding-top: ${statusBarHeight + 'px'};
`;

export const Container = styled.View`
  padding-left: 14px;
  height: 100%;
`;
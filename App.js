import React from 'react'
import { StatusBar } from 'expo-status-bar';
import MainApp from './src/Pages/MainApp';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/Pages/Login';

import AuthProvider from './src/contexts/auth';
import { ThemeProvider } from 'styled-components';
import ScreenThemeProvider, { ScreenThemeContext } from './src/contexts/theme'

import AppLoading from 'expo-app-loading';

import { theme } from './src/design/theme'

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ScreenThemeProvider>
          <NavigationContainer>
            <AuthProvider>
              <Navigator initialRouteName='Login'>
                <Screen 
                  name='Login'
                  options={{
                    headerShown: false,
                    
                  }}
                  component={Login}
                />

                <Screen 
                  name='Home'
                  options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    gestureEnabled: false
                  }}
                  component={MainApp}
                />
              </Navigator>
            </AuthProvider>
          </NavigationContainer>

          <Toast />
        </ScreenThemeProvider>
      </ThemeProvider>
    </>
  );
}

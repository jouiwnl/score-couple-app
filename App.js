import React from 'react'
import 'react-native-gesture-handler';
import MainApp from './src/Pages/MainApp';

import Toast from 'react-native-toast-message'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/Pages/Login';

import AuthProvider from './src/contexts/auth';
import ScreenThemeProvider from './src/contexts/theme'

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <>
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
    </>
  );
}

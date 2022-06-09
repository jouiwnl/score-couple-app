import React from 'react'
import { StatusBar } from 'expo-status-bar';
import MainApp from './src/Pages/MainApp';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/Pages/Login';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
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
      </NavigationContainer>
      
      <StatusBar style="light" />

      <Toast />
    </>
  );
}

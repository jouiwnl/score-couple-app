import React from 'react'
import 'react-native-gesture-handler';
import MainApp from './src/Pages/MainApp';

import Toast from 'react-native-toast-message'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/Pages/Login';

import AuthProvider from './src/contexts/auth';
import ScreenThemeProvider from './src/contexts/theme'
import { auth } from './firebase';
import * as SplashScreen from 'expo-splash-screen';
import _ from 'lodash';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState({email: ""});
  const [stateChaged, setStateChanged] = React.useState(false);

  SplashScreen.preventAutoHideAsync();
  
  React.useEffect(() => {
    auth.onAuthStateChanged((response) => {
      setStateChanged(true);
      if (auth.currentUser) {
        setUser(response)
      }
    });
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1500)
  }, [user])

  return (
    <>
      {stateChaged && (
        <ScreenThemeProvider>
          <NavigationContainer>
            <AuthProvider>
              <Navigator initialRouteName={!_.isEmpty(auth.currentUser) ? "Home" : "Login"}>
                
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
      )}
    </>
  );
}

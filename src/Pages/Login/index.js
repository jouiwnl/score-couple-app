import React, { useContext } from 'react'
import {
  Wrapper,
  FormWrapper,
  Logo,
  FormInput,
  FormInputs,
  InputLabel,
  ActionButtons,
  LoginButton,
  ButtonLabel,
  Input,
  InputIcon
} from './styles'

import { MaterialIcons } from '@expo/vector-icons'; 
import { Keyboard, TouchableWithoutFeedback, Text } from 'react-native'

import logo from './assets/logo.png';
import createToast from '../../utils/createToast';

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/auth';
import { StatusBar } from 'expo-status-bar';
import { ScreenThemeContext } from '../../contexts/theme';

export default function() {
  const Route = useRoute();

  const { screenTheme } = React.useContext(ScreenThemeContext)

  const navigate = useNavigation();
  const [isLogginIn, setIsLogginIn] = React.useState(false);
  const [loginValues, setLoginValues] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(null);

  const { signIn } = useContext(AuthContext);

  setInterval(() => {
    setCurrentUser(auth.currentUser)
  }, 500)

  function handleLogin() {
    setIsLogginIn(true);
    signIn(loginValues.email, loginValues.password).then(() => {
      navigate.navigate('Home')
      setLoginValues({})
      createToast('success', 'Bem-vindo!', `Logado como ${loginValues.email}`)
    }).catch(error => {
      createToast('error', 'Erro!', error.message)
    }).finally(() => {
      setIsLogginIn(false)
    })
  }

  function handleInputChange(name, value) {
    setLoginValues({...loginValues, [name]: value});
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Wrapper>
            
              <FormWrapper>
                <Logo 
                  style={{ resizeMode: 'contain' }} 
                  source={logo} 
                />

                <FormInputs>

                  <InputLabel>E-mail</InputLabel>
                  <FormInput >
                    <InputIcon>
                      <MaterialIcons name="email" size={24} color="#fff" />
                    </InputIcon>
                    <Input 
                      autocomplete="off"
                      keyboardType="email-address"
                      placeholder={'Insira seu e-mail'} 
                      placeholderTextColor="#767676"
                      value={loginValues.email}
                      onChangeText={value => handleInputChange('email', value)}
                    />
                  </FormInput>

                  <InputLabel>Password</InputLabel>
                  <FormInput>
                    <InputIcon>
                      <MaterialIcons name="lock" size={24} color="#fff" />
                    </InputIcon>
                    <Input 
                      placeholder={'Insira sua senha'} 
                      placeholderTextColor="#767676"
                      secureTextEntry={true}
                      value={loginValues.password}
                      onChangeText={value => handleInputChange('password', value)}
                    />
                  </FormInput>

                </FormInputs>

                <ActionButtons>

                  <LoginButton onPress={handleLogin}>
                    {isLogginIn && (
                      <Loading size={"small"}   />
                    )}

                    {!isLogginIn && (
                      <ButtonLabel>Login</ButtonLabel>
                    )}
                  </LoginButton>

                </ActionButtons>

              </FormWrapper>

          </Wrapper>
        </TouchableWithoutFeedback>

        <StatusBar style={
          screenTheme === 'light' && Route.name === 'Login' ? 'light' : (screenTheme === 'dark' ? 'light' : 'dark')
        } />
        
    </GestureHandlerRootView>
  )
}
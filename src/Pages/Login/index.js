import React from 'react'
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
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback, Text } from 'react-native'

import logo from './assets/logo.png';
import createToast from '../../utils/createToast';

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase';

import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';

export default function() {
  const navigate = useNavigation();
  const [isLogginIn, setIsLogginIn] = React.useState(false);
  const [isHaveUserAuthenticated, setIsHaveUserAuthenticated] = React.useState(null);
  const [loginValues, setLoginValues] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState(null);
  const [showLoginForm, setShowLoginForm] = React.useState(false);

  setInterval(() => {
    setCurrentUser(auth.currentUser)
  }, 500)

  React.useEffect(() => {
    if (currentUser) {
      setIsHaveUserAuthenticated(true)
      setShowLoginForm(true)
      setTimeout(() => {
        navigate.navigate('Home')
      }, 3000)
    } else {
      setIsHaveUserAuthenticated(false)
      setTimeout(() => {
        setShowLoginForm(true)
      }, 1000)
    }
  }, [currentUser])

  useFocusEffect(() => {
    if (auth.currentUser) {
      navigate.navigate('Home');
    }
  })

  function handleLogin() {
    setIsLogginIn(true);
    signInWithEmailAndPassword(auth, loginValues.email, loginValues.password).then(() => {
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
          {isHaveUserAuthenticated && (
            <>
              <ActivityIndicator size="large" color="white" />
              <Text style={{ color: '#fff' }}>Carregando...</Text>
            </>
          )}

          {!isHaveUserAuthenticated && showLoginForm && (
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
                    <ActivityIndicator size="small" color="white" />
                  )}

                  {!isLogginIn && (
                    <ButtonLabel>Login</ButtonLabel>
                  )}
                </LoginButton>

              </ActionButtons>

            </FormWrapper>
          )}
        </Wrapper>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  )
}
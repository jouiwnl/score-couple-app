import React from 'react';

import { ActivityIndicator } from 'react-native'
import { Container, Avatar, OnlineStatus, RightSide, Button, Username, UserInfo } from './styles'
import { Entypo } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';

import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase';
import createToast from '../../utils/createToast';

export default function({ user }) {

  const navigate = useNavigation();
  const [isLogOut, setIsLogOut] = React.useState(false)

  function handleSignOut() {

    setIsLogOut(true)

    setTimeout(() => {
      signOut(auth).then(() => {
        navigate.navigate('Login')
      }).catch(error => {
        createToast('error', 'Erro!', 'Houve um erro ao deslogar...')
      }).finally(() => {
        setIsLogOut(false)
      })
    }, 750)
    
  }

  return (
    <Container>
      <UserInfo>
        <Avatar>
          <OnlineStatus />
        </Avatar>
        <Username>{ user.username }</Username>
      </UserInfo>
      
      <RightSide>
        <Button onPress={handleSignOut}>

          {isLogOut && ( <ActivityIndicator size="small" color="white" /> )}

          {!isLogOut && (
            <Entypo 
              name="log-out" 
              size={23} 
              color="#FFF" 
            />
          )}
          
        </Button>
      </RightSide>
    </Container>
  )
}
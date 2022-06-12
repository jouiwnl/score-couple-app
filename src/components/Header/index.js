import React from 'react';

import { 
  Container, 
  Avatar, 
  OnlineStatus, 
  RightSide,
  Button, 
  Username, 
  UserInfo,
  AvatarImage 
} from './styles'
import { Entypo } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';

import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase';
import createToast from '../../utils/createToast';
import Loading from '../Loading';
import { AuthContext } from '../../contexts/auth';

export default function({}) {

  const navigate = useNavigation();
  const [isLogOut, setIsLogOut] = React.useState(false)

  const { user, setUser } = React.useContext(AuthContext)

  function handleSignOut() {
    setIsLogOut(true)

    setTimeout(() => {
      signOut(auth).then(() => {
        setUser({});
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
        <Avatar onPress={() => navigate.navigate('Configs')}>
          <AvatarImage source={{ uri: user.avatarUrl }} />
          <OnlineStatus />
        </Avatar>
        <Username>{ user.username }</Username>
      </UserInfo>
      
      <RightSide>
        <Button onPress={handleSignOut}>

          {isLogOut && ( <Loading size={"small"}   /> )}

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
import React from 'react';

import { Container, Avatar, OnlineStatus, RightSide, Button, Username, UserInfo } from './styles'
import { Entypo } from '@expo/vector-icons'; 

export default function() {
  return (
    <Container>
      <UserInfo>
        <Avatar>
          <OnlineStatus />
        </Avatar>
        <Username>Bichas</Username>
      </UserInfo>
      
      <RightSide>
        <Button>
          <Entypo 
            name="log-out" 
            size={23} 
            color="#FFF" 
          />
        </Button>
      </RightSide>
    </Container>
  )
}
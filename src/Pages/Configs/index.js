import React from 'react'

import { 
  Wrapper,
  HeaderWrapper,
  HeaderTitle,
  ConfigsWrapper,
  ConfigItem,
} from './styles'

import { apiURL } from '../../utils/api'
import { auth } from '../../../firebase'
import ConfigAvatar from '../../components/ConfigAvatar'

export default function() {

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getUser();
  }, [])

  async function getUser() {
    return apiURL.get(`/users/findBy/${auth.currentUser.email}`).then(response => {
      setUser(response.data)
    });
  }

  return (
    
      <Wrapper>
        
        <HeaderWrapper>
          <HeaderTitle>Configurações</HeaderTitle>
        </HeaderWrapper>

        <ConfigAvatar userCame={user} reload={getUser}/>
        
      </Wrapper>
  )
}
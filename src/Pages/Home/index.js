import React from 'react';

import Header from '../../components/Header'
import WorkSpace from '../../components/WorkSpace';
import Loading from '../../components/Loading';

import { Container, Wrapper } from './styles'
import { AuthContext } from '../../contexts/auth';

export default function({ 
  openModalMovie, 
  openModalColumn
}) {

  const { user } = React.useContext(AuthContext)

  return (
    <Wrapper>
      <Container>
        <Header user={user}/>

        {!user.workspace && (<Loading size={'large'} fullwidth={true} />)}

        {user.workspace && (
          <WorkSpace 
            openModalMovie={openModalMovie} 
            openModalColumn={openModalColumn}
          />
        )}
        
      </Container>
    </Wrapper>
    
  )
}
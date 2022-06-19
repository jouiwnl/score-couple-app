import React from 'react';

import Header from '../../components/Header'
import WorkSpace from '../../components/WorkSpace';
import Loading from '../../components/Loading';

import { Container, Wrapper } from './styles'
import { AuthContext } from '../../contexts/auth';

import MediaProvider from '../../contexts/media'

export default function({ 
  openModalMedia, 
  openModalColumn
}) {

  const { user } = React.useContext(AuthContext)

  return (
    <Wrapper>
      <Container>
        <Header user={user}/>

        {!user && (<Loading size={'large'} fullwidth={true} />)}

        {user && (
          <WorkSpace 
            openModalMedia={openModalMedia} 
            openModalColumn={openModalColumn}
          />
        )}
        
      </Container>
    </Wrapper>
  )
}
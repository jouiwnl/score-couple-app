import React from 'react';

import Header from '../../components/Header'
import WorkSpace from '../../components/WorkSpace';
import Loading from '../../components/Loading';

import { Container, Wrapper } from './styles'

import { apiURL } from '../../utils/api';

import { auth } from '../../../firebase';

export default function({ 
  openModalMovie, 
  openModalColumn,
  handleSelectedMovie, 
  handleSelectedColumn, 
  hasAlterItem, 
  navigation, 
  navigate 
}) {

  const [workspace, setWorkspace] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    getWorkSpace(false);
  }, [])

  React.useEffect(() => {
    if (hasAlterItem) {
      getWorkSpace(false);
    }
  }, [hasAlterItem])

  function getWorkSpace(hideLoading) {
    if (!hideLoading) {
      setIsLoading(true);
    }

    let promise = apiURL.get(`/users/${auth.currentUser.email}`);
    promise.then(response => {
      setUser(response.data)
      setWorkspace(response.data.workspace)
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function onRefresh() {
    getWorkSpace(true);
  }

  return (
    <Wrapper>
      <Container>
        <Header user={user}/>

        {isLoading && (<Loading size={'large'} />)}

        {!isLoading && workspace && (
          <WorkSpace 
            navigation={navigation}
            onRefresh={onRefresh} 
            handleSelectedMovie={handleSelectedMovie} 
            openModalMovie={openModalMovie} 
            openModalColumn={openModalColumn}
            handleSelectedColumn={handleSelectedColumn}
            rows={workspace.colunas}
            user={user}
            navigate={navigate}
          />
        )}
        
      </Container>
    </Wrapper>
    
  )
}
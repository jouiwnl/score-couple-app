import React from 'react';

import Header from '../../components/Header'
import WorkSpace from '../../components/WorkSpace';
import Loading from '../../components/Loading';

import { Container, Wrapper } from './styles'

import axios from 'axios'

export default function({ openModalMovie, openModalColumn, handleSelectedMovie, handleSelectedColumn, hasAlterItem, navigation, navigate }) {

  const [workspace, setWorkspace] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

    let promise = axios.get("https://score-couple.herokuapp.com/users/joao.hlm@hotmail.com");
    promise.then(response => {
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
        <Header />

        {isLoading && (<Loading />)}

        {!isLoading && workspace && (
          <WorkSpace 
            navigation={navigation}
            onRefresh={onRefresh} 
            handleSelectedMovie={handleSelectedMovie} 
            openModalMovie={openModalMovie} 
            openModalColumn={openModalColumn}
            handleSelectedColumn={handleSelectedColumn}
            rows={workspace.colunas}
            navigate={navigate}
          />
        )}
        
      </Container>
    </Wrapper>
    
  )
}
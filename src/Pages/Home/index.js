import React from 'react';

import Header from '../../components/Header'
import WorkSpace from '../../components/WorkSpace';

import { Container, Wrapper } from './styles'

export default function() {
  return (
    <Wrapper>
      <Container>
        <Header />

        <WorkSpace />

      </Container>
    </Wrapper>
    
  )
}
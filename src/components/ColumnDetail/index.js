import React from 'react'

import { Wrapper, Header, Form, Footer, TitleColumn, Input } from './styles';
import ModalColumnFooter from '../ModalColumnFooter'

import { auth } from '../../../firebase';

import { apiURL } from '../../utils/api';

import { GenericContext } from '../../contexts/generic'
import { AuthContext } from '../../contexts/auth'

export default function({ handleCloseColumn }) {
  const { column, setColumn } = React.useContext(GenericContext);
  const { user } = React.useContext(AuthContext);

  function handleInputChange(value) {
    setColumn({
      ...column, 
      title: value,
      workspace: { id: user.workspace.id }
    });
  }

  return (
    <Wrapper>
      <Header>
        <TitleColumn>{column.id ? 'Editando' : 'Adicionando'} coluna</TitleColumn>
      </Header>

      <Form>
        <Input 
          placeholder="Nome da coluna"
          placeholderTextColor="#767676"
          onChangeText={(value) => handleInputChange(value)}
          value={column.title || ''}
        />
      </Form>
      
      <Footer>
          <ModalColumnFooter   
            handleCloseColumn={handleCloseColumn} 
          />
      </Footer>
    </Wrapper>
  )
}
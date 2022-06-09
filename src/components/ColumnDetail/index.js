import React from 'react'

import { Wrapper, Header, Form, Footer, TitleColumn, Input } from './styles';
import ModalColumnFooter from '../ModalColumnFooter'

import { auth } from '../../../firebase';

import { apiURL } from '../../utils/api';

export default function({ column, handleCloseColumn }) {

  const [selectedColumn, setSelectedColumn] = React.useState({ title: "" });
  const [workspace, setWorkspace] = React.useState(null);

  React.useEffect(() => {
    if (column) {
      setSelectedColumn({...column, workspace: workspace})
    }
  }, [column])

  React.useEffect(() => {
    getWorkSpace();
  }, [])

  function getWorkSpace() {
    let promise = apiURL.get(`/users/${auth.currentUser.email}`);
    promise.then(response => {
      setWorkspace(response.data.workspace)
    });
  }

  function handleInputChange(value) {
    setSelectedColumn({
      ...selectedColumn, 
      title: value,
      workspace: { id: workspace.id }
    });
  }

  function cleanColumn() {
    setSelectedColumn({})
  }

  return (
    <Wrapper>
      <Header>
        <TitleColumn>{selectedColumn.id ? 'Editando' : 'Adicionando'} coluna</TitleColumn>
      </Header>

      <Form>
        <Input 
          placeholder="Nome da coluna"
          placeholderTextColor="#767676"
          onChangeText={(value) => handleInputChange(value)}
          value={selectedColumn.title || ''}
        />
      </Form>
      
      <Footer>
          <ModalColumnFooter 
            cleanColumn={cleanColumn} 
            column={selectedColumn} 
            handleCloseColumn={handleCloseColumn} 
          />
      </Footer>
    </Wrapper>
  )
}
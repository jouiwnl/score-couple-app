import React from 'react'

import { Wrapper, Header, Form, Footer, TitleColumn, Input } from './styles';
import ModalColumnFooter from '../ModalColumnFooter'

export default function({ column, handleCloseColumn }) {

  const [selectedColumn, setSelectedColumn] = React.useState({ title: "" });

  React.useEffect(() => {
    if (column) {
      setSelectedColumn({...column, workspace: { id: 10 }})
    }
  }, [column])

  function handleInputChange(value) {
    setSelectedColumn({
      ...selectedColumn, 
      title: value,
      workspace: { id: 10 }
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
          <ModalColumnFooter cleanColumn={cleanColumn} column={selectedColumn} handleCloseColumn={handleCloseColumn} />
      </Footer>
    </Wrapper>
  )
}
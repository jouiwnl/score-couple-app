import React from 'react'

import { 
  Wrapper, 
  Header, 
  Form, 
  TitleColumn, 
  Input, 
  FooterWrapper, 
  SaveButton, 
  DeleteButton, 
  ButtonLabel 
} from './styles';

import { GenericContext } from '../../contexts/generic'
import { AuthContext } from '../../contexts/auth'
import { apiURL } from '../../utils/api';

import Loading from '../Loading';
import { Alert } from 'react-native';

export default function({ handleCloseColumn }) {
  const { column, setColumn } = React.useContext(GenericContext);
  const { user, workspace } = React.useContext(AuthContext);

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  function handleInputChange(value) {
    setColumn({
      ...column, 
      title: value,
      workspace: { id: workspace.id }
    });
  }

  async function save() {
    setIsSaving(true);
    delete column.medias;
    
    if (column.id) {
      let promise = apiURL.put(`/colunas/${column.id}`, column);
      promise.then(() => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    } else {
      let promise = apiURL.post(`/colunas`, column);
      promise.then(() => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    }
  }

  async function remove() {
    setIsDeleting(true);
    Alert.alert(
      "Confirmação",
      `Tem certeza que deseja excluir a seção ${column.title}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            let promise = apiURL.delete(`/colunas/${column.id}`);
            promise.then(() => {
              handleCloseColumn(column);
              return false;
            }).finally(setIsDeleting)
          }
        },
        {
          text: "Não",
          onPress: () => setIsDeleting(false)
        }
      ]
    )
  }

  return (
    <Wrapper>
      <Header>
        <TitleColumn>{column.id ? 'Editando' : 'Adicionando'} seção</TitleColumn>
      </Header>

      <Form>
        <Input 
          placeholder="Nome da coluna"
          placeholderTextColor="#767676"
          onChangeText={(value) => handleInputChange(value)}
          value={column.title || ''}
        />
      </Form>
      
      <FooterWrapper>
        <SaveButton onPress={save}>
          {isSaving && (
            <Loading size={"small"}   />
          )}

          {!isSaving && (
            <ButtonLabel>Salvar</ButtonLabel>
          )}
        </SaveButton>
        
        {column && column.id && (
          <DeleteButton onPress={remove}>
            {isDeleting && (
              <Loading size={"small"}   />
            )}

            {!isDeleting && (
              <ButtonLabel>Apagar</ButtonLabel>
            )}
          </DeleteButton>
        )}
      </FooterWrapper>
    </Wrapper>
  )
}
import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'

import { apiURL } from '../../utils/api';

import _ from 'lodash'
import Loading from '../Loading';
import { GenericContext } from '../../contexts/generic';

export default function({ handleCloseColumn }) {

  const { column } = React.useContext(GenericContext);

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function save() {
    setIsSaving(true);
    if (column.id) {
      let promise = apiURL.put(`/columns/${column.id}`, column);
      promise.then(() => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    } else {
      let promise = apiURL.post(`/columns`, column);
      promise.then(() => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    }
  }

  async function remove() {
    setIsDeleting(true);
    let promise = apiURL.delete(`/columns/${column.id}`);
    promise.then(() => {
      handleCloseColumn(column);
      return false;
    }).finally(setIsDeleting)
  }

  return (
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
  )
}
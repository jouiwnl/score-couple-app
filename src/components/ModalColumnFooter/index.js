import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'
import { ActivityIndicator } from 'react-native';

import { apiURL } from '../../utils/api';

import _ from 'lodash'

export default function({ column, handleCloseColumn }) {

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function save() {
    setIsSaving(true);
    if (column.id) {
      let promise = apiURL.put(`/columns/${column.id}`, column);
      promise.then((response) => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    } else {
      let promise = apiURL.post(`/columns`, column);
      promise.then((response) => {
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
          <ActivityIndicator size="small" color="white" />
        )}

        {!isSaving && (
          <ButtonLabel>Salvar</ButtonLabel>
        )}
      </SaveButton>
        
      {column && column.id && (
        <DeleteButton onPress={remove}>
          {isDeleting && (
            <ActivityIndicator size="small" color="white" />
          )}

          {!isDeleting && (
            <ButtonLabel>Apagar</ButtonLabel>
          )}
        </DeleteButton>
      )}
    </FooterWrapper>
  )
}
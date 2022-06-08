import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';

import _ from 'lodash'

export default function({ column, handleCloseColumn }) {

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function save() {
    setIsSaving(true);
    if (column.id) {
      let promise = axios.put(`https://score-couple.herokuapp.com/columns/${column.id}`, column);
      promise.then((response) => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    } else {
      let promise = axios.post(`https://score-couple.herokuapp.com/columns`, column);
      promise.then((response) => {
        handleCloseColumn(column);
        return false;
      }).finally(setIsSaving);
    }
  }

  async function remove() {
    setIsDeleting(true);
    let promise = axios.delete(`https://score-couple.herokuapp.com/columns/${column.id}`);
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
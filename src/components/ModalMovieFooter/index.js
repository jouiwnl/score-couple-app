import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'
import { ActivityIndicator } from 'react-native';

import { apiURL } from '../../utils/api';

export default function({ movie, handleCloseMovie }) {

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function save() {
    setIsSaving(true);
    let promise = apiURL.put(`/movies/${movie.id}`, movie);
    promise.then((response) => {
      handleCloseMovie(movie);
      return false;
    }).finally(setIsSaving);
  }

  async function remove() {
    setIsDeleting(true);
    let promise = apiURL.delete(`/movies/${movie.id}`);
    promise.then(() => {
      handleCloseMovie(movie);
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

      <DeleteButton onPress={remove}>
        {isDeleting && (
          <ActivityIndicator size="small" color="white" />
        )}

        {!isDeleting && (
          <ButtonLabel>Apagar</ButtonLabel>
        )}
      </DeleteButton>
    </FooterWrapper>
  )
}
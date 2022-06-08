import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';

export default function({ movie, handleCloseMovie }) {

  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function save() {
    setIsSaving(true);
    let promise = axios.put(`https://score-couple.herokuapp.com/movies/${movie.id}`, movie);
    promise.then((response) => {
      handleCloseMovie(movie);
      return false;
    }).finally(setIsSaving);
  }

  async function remove() {
    setIsDeleting(true);
    let promise = axios.delete(`https://score-couple.herokuapp.com/movies/${movie.id}`);
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
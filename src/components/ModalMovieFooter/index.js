import React from 'react'
import { FooterWrapper, SaveButton, DeleteButton, ButtonLabel } from './styles'

import { apiURL } from '../../utils/api';
import Loading from '../Loading';
import { GenericContext } from '../../contexts/generic';

export default function({ handleCloseMovie }) {

  const { movie } = React.useContext(GenericContext)

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
          <Loading size={"small"}   />
        )}

        {!isSaving && (
          <ButtonLabel>Salvar</ButtonLabel>
        )}
      </SaveButton>

      <DeleteButton onPress={remove}>
        {isDeleting && (
          <Loading size={"small"}   />
        )}

        {!isDeleting && (
          <ButtonLabel>Apagar</ButtonLabel>
        )}
      </DeleteButton>
    </FooterWrapper>
  )
}
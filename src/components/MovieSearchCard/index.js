import React from 'react'

import { MovieCardWrapper, MovieImage } from './styles'

import { API_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';

export default function({ 
  movie, 
  openModalAddMovie
}) {

  const { setMovie } = React.useContext(GenericContext);

  function handleSelectedMovie() {
    setMovie(movie);
    openModalAddMovie();
  }

  return (
    <MovieCardWrapper onPress={handleSelectedMovie}>
      <MovieImage source={{ uri: `${API_IMAGE.concat(movie.poster_path)}` }}/>
    </MovieCardWrapper>
  )
}
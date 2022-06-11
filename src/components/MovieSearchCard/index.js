import React from 'react'

import { MovieCardWrapper, MovieImage } from './styles'

import { API_IMAGE } from '../../utils/api';

export default function({ movie, openModalAddMovie, handleSelectedMovieToAdd, navigation }) {

  function handleSelectedMovie() {
    handleSelectedMovieToAdd(movie);
    openModalAddMovie();
  }

  return (
    <MovieCardWrapper onPress={handleSelectedMovie}>
      <MovieImage source={{ uri: `${API_IMAGE.concat(movie.poster_path)}` }}/>
    </MovieCardWrapper>
  )
}
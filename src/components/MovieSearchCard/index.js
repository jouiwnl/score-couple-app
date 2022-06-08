import React from 'react'

import { MovieCardWrapper, MovieImage } from './styles'

export default function({ movie, openModalAddMovie, handleSelectedMovieToAdd, navigation }) {

  const API_IMAGE = `https://image.tmdb.org/t/p/w400`;

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
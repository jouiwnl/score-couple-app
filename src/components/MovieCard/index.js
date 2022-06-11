import React from 'react'
import { MovieImage, MovieRating, MovieTitle, MovieWrapper, MovieStatus } from './styles'
import { AirbnbRating } from 'react-native-ratings';

import { Platform } from 'react-native'

import { apiMovieURL, apiURL, API_IMAGE } from '../../utils/api';
import axios from 'axios';

export default function({ movie, openModalMovie, handleSelectedMovie }) {

  function handleOnPress() {
    handleSelectedMovie(movie);
    openModalMovie();
  }

  return (
    <MovieWrapper onPress={handleOnPress}>
      {movie && (
        <>
          {movie.status != 'NOTSTARTED' && (<MovieStatus statusColor={movie.status} />)}
          
          <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}/>

          <MovieTitle numberOfLines={1}>{movie.name}</MovieTitle>

          <MovieRating>
            {movie.status != 'NOTSTARTED' && movie.status != 'DOING' && (
              <AirbnbRating 
                isDisabled={true} 
                reviews={[""]}
                ratingContainerStyle={{ marginTop: Platform.OS === 'android' ? -40 : -20 }} 
                defaultRating={movie.score ? movie.score : 0} 
                size={12}
              />
            )}
            
          </MovieRating>
        </>
      )}
    </MovieWrapper>
  )
}
import React from 'react'
import { MovieImage, MovieRating, MovieTitle, MovieWrapper, MovieStatus } from './styles'
import { AirbnbRating } from 'react-native-ratings';

export default function({ movie, openModalMovie, handleSelectedMovie }) {

  const API_IMAGE = `https://image.tmdb.org/t/p/w400`;

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
            {movie.score && movie.score > 0 && (
              <AirbnbRating 
                isDisabled={true} 
                reviews={[""]}
                ratingContainerStyle={{ marginTop: -15 }} 
                defaultRating={movie.score} 
                size={12}
              />
            )}
            
          </MovieRating>
        </>
      )}
    </MovieWrapper>
  )
}
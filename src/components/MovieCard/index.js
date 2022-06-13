import React from 'react'
import { MovieImage, MovieRating, MovieTitle, MovieWrapper, MovieStatus } from './styles'

import { API_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';
import { ScreenThemeContext } from '../../contexts/theme';

import StarRatingDisplay from 'react-native-star-rating-widget';

export default function({ movie, openModalMovie }) {

  const { setMovie } = React.useContext(GenericContext)
  const { screenTheme } = React.useContext(ScreenThemeContext);

  function handleOnPress() {
    setMovie(movie);
    openModalMovie();
  }

  return (
    <MovieWrapper onPress={handleOnPress}>
      {movie && (
        <>
          {movie.status != 'NOTSTARTED' && (<MovieStatus statusColor={movie.status} />)}
          
          <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}/>

          <MovieTitle screenTheme={screenTheme} numberOfLines={1}>{movie.name}</MovieTitle>

          <MovieRating>
            {movie.status != 'NOTSTARTED' && movie.status != 'DOING' && (
              <StarRatingDisplay
                rating={!movie.score ? 0 : movie.score}
                onChange={() => {return}}
                maxStars={5}
                minRating={0.5} 
                starSize={11}
                color="#fdd835"
                style={{
                  padding: 0
                }}
              />
            )}
            
          </MovieRating>
        </>
      )}
    </MovieWrapper>
  )
}
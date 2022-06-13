import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { API_IMAGE } from '../../utils/api'

import { MovieImage } from './styles'
import { GenericContext } from '../../contexts/generic'
import { ScreenThemeContext } from '../../contexts/theme'

export default function() {

  const { movie } = React.useContext(GenericContext);
  const { screenTheme }  = React.useContext(ScreenThemeContext);

  return (
    <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
      <LinearGradient 
        colors={['#00000000', screenTheme === 'dark' ? '#000014' : '#fff']} 
        style={{ flex: 1 }} 
      />
    </MovieImage>
  )
}
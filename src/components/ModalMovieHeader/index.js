import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { API_IMAGE } from '../../utils/api'

import { MovieImage } from './styles'
import { GenericContext } from '../../contexts/generic'

export default function() {

  const { movie } = React.useContext(GenericContext)

  return (
    <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
      <LinearGradient 
        colors={['#00000000', '#000014']} 
        style={{ flex: 1 }} 
      />
    </MovieImage>
  )
}
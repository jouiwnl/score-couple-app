import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { API_IMAGE } from '../../utils/api'

import { MovieImage } from './styles'

export default function({ movie }) {
  return (
    <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
      <LinearGradient 
        colors={['#00000000', '#000014']} 
        style={{ flex: 1 }} 
      />
    </MovieImage>
  )
}
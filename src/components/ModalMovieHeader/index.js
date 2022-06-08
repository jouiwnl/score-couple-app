import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { MovieImage } from './styles'

export default function({ movie }) {

  const API_IMAGE = `https://image.tmdb.org/t/p/w400`;

  return (
    <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
      <LinearGradient colors={['#00000000', '#000014']} style={{height : '100%', width : '100%'}} />
    </MovieImage>
  )
}
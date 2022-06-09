import React from 'react'
import { ActivityIndicator } from 'react-native';

import { LoadingWrapper } from './styles';

export default function({ size, fullwidth }) {
  return (
    <LoadingWrapper fullwidth={fullwidth}>
      <ActivityIndicator size={size} color="white" />
    </LoadingWrapper>
  )
}
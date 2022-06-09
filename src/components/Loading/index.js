import React from 'react'
import { ActivityIndicator } from 'react-native';

import { LoadingWrapper } from './styles';

export default function({ size }) {
  return (
    <LoadingWrapper>
      <ActivityIndicator size={size} color="white" />
    </LoadingWrapper>
  )
}
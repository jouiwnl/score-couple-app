import React from 'react'
import { ActivityIndicator } from 'react-native';

import { LoadingWrapper } from './styles';



export default function() {
  return (
    <LoadingWrapper>
      <ActivityIndicator size="large" color="white" />
    </LoadingWrapper>
  )
}
import React from 'react'
import { WorkSpaceRows, WorkSpaceTitle, WorkSpaceWrapper } from './styles'
import { Text } from 'react-native'
import Row from '../Row'

export default function() {
  return (
    <WorkSpaceWrapper>
      <WorkSpaceTitle>Bichas's WorkSpace</WorkSpaceTitle>
      
      <WorkSpaceRows>
          <Row />
      </WorkSpaceRows>
    </WorkSpaceWrapper>
  )
}
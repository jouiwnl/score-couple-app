import React from "react";

import { Card, WrapperButton, ButtonLabel } from './styles'
import { useNavigation } from '@react-navigation/native';

export default function({ columnId, navigate }) {

  const navigation = useNavigation();

  React.useEffect(() => {
    if (!navigate) return;
    navigation.navigate(String(navigate))
  }, [navigate])

  return (
    <Card>
      <WrapperButton
        onPress={() => {
          navigation.navigate('Search', { columnId: columnId })
        }}
      >
        <ButtonLabel>+ Card</ButtonLabel>
      </WrapperButton>
    </Card>
  )
}
import React from "react";

import { Card, WrapperButton, ButtonLabel } from './styles';
import { NavigationContext } from "../../contexts/navigation";

export default function({ columnId }) {

  const { navigate } = React.useContext(NavigationContext)

  return (
    <Card>
      <WrapperButton
        onPress={() => {
          navigate('Search', { columnId: columnId })
        }}
      >
        <ButtonLabel>+ Card</ButtonLabel>
      </WrapperButton>
    </Card>
  )
}
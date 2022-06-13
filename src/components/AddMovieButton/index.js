import React from "react";

import { Card, WrapperButton, ButtonLabel } from './styles'
import { NavigationContext } from "../../contexts/navigation";
import { ScreenThemeContext } from "../../contexts/theme";

export default function({ columnId }) {

  const { navigate } = React.useContext(NavigationContext)
  const { screenTheme } = React.useContext(ScreenThemeContext)

  return (
    <Card screenTheme={screenTheme}>
      <WrapperButton
        onPress={() => {
          navigate('Search', { columnId: columnId })
        }}
      >
        <ButtonLabel screenTheme={screenTheme}>+ Card</ButtonLabel>
      </WrapperButton>
    </Card>
  )
}
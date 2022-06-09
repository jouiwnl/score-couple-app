import { css } from 'styled-components'
import styled from 'styled-components/native'

export const LoadingWrapper = styled.View`
  align-items: center;
  justify-content: center;

  ${props => props.fullwidth && css`
    width: 100%;
    height: 80%;
  `}
`
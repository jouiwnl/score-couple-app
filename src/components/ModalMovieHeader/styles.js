import styled from 'styled-components/native'

import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height;

export const MovieImage = styled.ImageBackground`
  width: 100%;
  height: ${() => {
    if (windowHeight > 800) {
      return (windowHeight/100) * 30 + 'px';
    }

    return (windowHeight/100) * 20 + 'px';  
  }};
  z-index: -10;
  border-radius: 10px;
  
`
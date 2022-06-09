import React from 'react'

import Toast from 'react-native-toast-message'

export default function(type, text1, text2) {
  return Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    topOffset: 50
  })
}
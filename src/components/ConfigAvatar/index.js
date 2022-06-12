import React from 'react'

import {
  AvatarConfigWrapper,
  ImageWrapper,
  AvatarImage,
  AvatarPlaceholder,
  AvatarInputWrapper,
  AvatarInput,
  AvatarInputButton,
  AvatarButtonLabel,
} from './styles'

import { apiURL } from '../../utils/api'
import Loading from '../../components/Loading'
import createToast from '../../utils/createToast'

import _ from 'lodash'
import { Keyboard } from 'react-native'
import { AuthContext } from '../../contexts/auth'

export default function() {
  const { user, getUser } = React.useContext(AuthContext);

  const [imageUrl, setImageUrl] = React.useState(undefined);
  const [cursorSelection, setCursorSelection] = React.useState({ start: 0, end: 0 })
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false); 

  const [formValues, setFormValues] = React.useState(user);

  React.useEffect(() => {
    setImageLoading(true)
    if (!_.isEmpty(user)) {
      setImageUrl(user.avatarUrl)
    }
    setTimeout(() => {
      setImageLoading(false)
    }, 750)
  }, [user])

  async function save() {
    if (!isValidImage()) {
      return createToast('error', 'Erro!', 'A URL de imagem não é válida');
    }

    setButtonLoading(true)
    apiURL.put(`/users/${user.id}`, formValues).then(() => {
      getUser(user.email, true);
    }).finally(() => {
      setButtonLoading(false);
      Keyboard.dismiss()
    });
  }

  function handleInputChange(name, value) {
    setFormValues({...user, [name]: value})
  }

  function handleFocus() {
    setCursorSelection(undefined)
  }

  function isValidImage() {
    let imageUrl = user.avatarUrl ?? userCame.avatarUrl;
    let regex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');
    let regexExtension = new RegExp(/\.(jpeg|jpg|gif|png)$/);

    if (imageUrl.match(regex)) {
      if (imageUrl.match(regexExtension)) {
        return true;
      }
    }

    return false;
  }

  return (
    <AvatarConfigWrapper>
      <ImageWrapper>

        {imageLoading && (
          <Loading size={'small'} />
        )}

        {!imageLoading && (
          !imageUrl ? (
            <AvatarPlaceholder />
          ) : (
            <AvatarImage source={{ uri: imageUrl }} />
          )
        )}

        
      </ImageWrapper>

      <AvatarInputWrapper>
        <AvatarInput 
          placeholder={'Url da foto'} 
          placeholderTextColor="#767676"
          value={formValues.avatarUrl ?? user.avatarUrl}
          onFocus={handleFocus}
          selection={cursorSelection}
          onChangeText={(text) => handleInputChange('avatarUrl', text)}
        />

        <AvatarInputButton onPress={save}>
          {buttonLoading ? (
            <Loading size={'small'}/>
          ) : (
            <AvatarButtonLabel>SALVAR</AvatarButtonLabel>
          )}
          
        </AvatarInputButton>
      </AvatarInputWrapper>

    </AvatarConfigWrapper>
  )

}
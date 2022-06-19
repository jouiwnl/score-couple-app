import React from 'react'

import { MediaCardWrapper, MediaImage } from './styles'

import { API_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';

export default function({ 
  media, 
  openModalAddMedia
}) {

  const { setMedia } = React.useContext(GenericContext);

  function handleSelectedMedia() {
    setMedia(media);
    openModalAddMedia();
  }

  return (
    <MediaCardWrapper onPress={handleSelectedMedia}>
      <MediaImage source={{ uri: `${API_IMAGE.concat(media.poster_path)}` }}/>
    </MediaCardWrapper>
  )
}
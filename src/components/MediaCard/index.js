import React from 'react'
import { MediaImage, MediaRating, MediaTitle, MediaWrapper, MediaStatus } from './styles'

import { API_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';

import StarRatingDisplay from 'react-native-star-rating-widget';

export default function({ media, openModalMedia }) {
  const { setMedia } = React.useContext(GenericContext)

  function handleOnPress() {
    setMedia(media);
    openModalMedia();
  }

  return (
    <MediaWrapper onPress={handleOnPress}>
      {media && (
        <>
          {media.status != 'NOTSTARTED' && (<MediaStatus statusColor={media.status} />)}
          
          <MediaImage source={{ uri: `${API_IMAGE.concat(media.posterUrl)}` }}/>

          <MediaTitle numberOfLines={1}>{media.name}</MediaTitle>

          <MediaRating>
            {media.status != 'NOTSTARTED' && media.status != 'DOING' && (
              <StarRatingDisplay
                rating={!media.score ? 0 : media.score}
                onChange={() => {return}}
                maxStars={5}
                minRating={0.5} 
                starSize={11}
                color="#fdd835"
                style={{
                  padding: 0
                }}
              />
            )}
            
          </MediaRating>
        </>
      )}
    </MediaWrapper>
  )
}
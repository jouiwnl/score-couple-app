import React from 'react'
import MediaCard from '../MediaCard'
import { RowItems, RowTitle, RowWrapper, RowHeader, RowButton } from './styles'
import { Entypo } from '@expo/vector-icons'; 
import AddMediaButton from '../AddMediaButton';
import { GenericContext } from '../../contexts/generic';
import { ScreenThemeContext } from '../../contexts/theme';
import { apiURL } from '../../utils/api';

export default function({ 
  row, 
  openModalMedia, 
  openModalColumn
}) {

  const { setColumn } = React.useContext(GenericContext)
  const { screenTheme } = React.useContext(ScreenThemeContext)

  function handleEdit() {
    openModalColumn();
    setColumn(row);
  }

  return (
    <RowWrapper>
      <RowHeader>
        <RowTitle>{row.title}</RowTitle>

        <RowButton onPress={handleEdit}>
          <Entypo 
            name="dots-three-horizontal" 
            size={24} 
            color={screenTheme === 'dark' ? 'white' : 'black'}
          />
        </RowButton>
      </RowHeader>
      
      <RowItems>
        {row.medias.length > 0 && row.medias.map(media => (
          <MediaCard 
            openModalMedia={openModalMedia} 
            key={media.id} 
            media={media} 
          />
        ))}
        <AddMediaButton columnId={row.id}/>
      </RowItems>
    </RowWrapper>
  )
}
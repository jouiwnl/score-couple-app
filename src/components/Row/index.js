import React from 'react'
import MovieCard from '../MovieCard'
import { RowItems, RowTitle, RowWrapper, RowHeader, RowButton } from './styles'
import { Entypo } from '@expo/vector-icons'; 
import AddMovieButton from '../AddMovieButton';
import { GenericContext } from '../../contexts/generic';

export default function({ 
  row, 
  openModalMovie, 
  openModalColumn
}) {

  const { setColumn } = React.useContext(GenericContext)

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
            color='white'
          />
        </RowButton>
      </RowHeader>
      
      <RowItems>
        {row.movies && row.movies.map(movie => (
          <MovieCard 
            openModalMovie={openModalMovie} 
            key={movie.id} 
            movie={movie} 
          />
        ))}
        <AddMovieButton columnId={row.id}/>
      </RowItems>
    </RowWrapper>
  )
}
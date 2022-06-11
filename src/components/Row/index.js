import React from 'react'
import MovieCard from '../MovieCard'
import { RowItems, RowTitle, RowWrapper, RowHeader, RowButton } from './styles'
import { Entypo } from '@expo/vector-icons'; 
import AddMovieButton from '../AddMovieButton';

export default function({ 
  movies, 
  row, 
  openModalMovie, 
  openModalColumn,
  handleSelectedMovie, 
  handleSelectedColumn,
  navigation, 
  navigate 
}) {

  function handleEdit() {
    openModalColumn();
    handleSelectedColumn(row);
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
        {movies && movies.map(movie => (
          <MovieCard 
            handleSelectedMovie={handleSelectedMovie} 
            openModalMovie={openModalMovie} 
            key={movie.id} 
            movie={movie} 
          />
        ))}
        <AddMovieButton navigate={navigate} columnId={row.id} navigation={navigation}/>
      </RowItems>
    </RowWrapper>
  )
}
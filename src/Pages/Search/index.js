import React from 'react';
import { apiMovieURL } from '../../utils/api'

import { Input, Wrapper, ListMovies, AlertWrapper, Message } from './styles'
import MovieSearchCard from '../../components/MovieSearchCard';
import Loading from '../../components/Loading'

import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import axios from 'axios'

export default function({ openModalAddMovie, handleSelectedMovieToAdd, columnId, navigation }) {

  const route = useRoute();

  const [inputValue, setInputValue] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (route.params.columnId) {
      columnId(route.params?.columnId)
    }
  }, [])

  async function handleSearch(text) {
    setIsLoading(true);
    setInputValue(text);

    if (text && text != "") {
      await axios.get(apiMovieURL.concat(text)).then(response => {
        setMovies(response.data.results);
      }).finally(() => {
        setIsLoading(false);
      })
    } else {
      setMovies([]);
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Input 
        onChangeText={handleSearch} 
        placeholder="Título, personagem ou gênero"
        placeholderTextColor="#767676" 
      />

      {isLoading && ( <Loading size={'large'} /> )}

      {movies.length > 0 && !isLoading && (
        <ListMovies>
          {movies.map(movie => (
            <MovieSearchCard 
              openModalAddMovie={openModalAddMovie} 
              handleSelectedMovieToAdd={handleSelectedMovieToAdd} 
              movie={movie} 
              key={movie.id}
              navigation={navigation}
            />
          ))}
        </ListMovies>
      )}

      {movies.length == 0 && !_.isEmpty(inputValue) && !isLoading && (
        <AlertWrapper>
          <Message>
            Nenhum resultado encontrado para a pesquisa: { inputValue }
          </Message>
        </AlertWrapper>
      )}
      
    </Wrapper>
  )
}
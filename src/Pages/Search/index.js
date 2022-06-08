import React from 'react';
import axios from 'axios'

import { Input, Wrapper, ListMovies, AlertWrapper, Message } from './styles'
import MovieSearchCard from '../../components/MovieSearchCard';
import Loading from '../../components/Loading'
import { TouchableOpacity } from 'react-native';

import { useRoute } from '@react-navigation/native';

import _ from 'lodash';

const API_KEY = 'c192d55728dabd6400055341d5b90bf9';
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

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
      await axios.get(API_URL.concat(text)).then(response => {
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

      {isLoading && ( <Loading /> )}

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

      {movies.length == 0 && !_.isEmpty(inputValue) && (
        <AlertWrapper>
          <Message>
            Nenhum resultado encontrado para a pesquisa: { inputValue }
          </Message>
        </AlertWrapper>
      )}
      
    </Wrapper>
  )
}
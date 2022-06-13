import React from 'react';
import { apiMovieURL } from '../../utils/api'

import { 
  InputWrapper,
  Input, 
  Wrapper, 
  ListMovies, 
  AlertWrapper, 
  Message 
} from './styles'

import { AntDesign } from '@expo/vector-icons';

import MovieSearchCard from '../../components/MovieSearchCard';
import Loading from '../../components/Loading'

import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import axios from 'axios'
import { ScreenThemeContext } from '../../contexts/theme';

export default function({ 
  openModalAddMovie,  
  columnId
}) {

  const route = useRoute();

  const { screenTheme } = React.useContext(ScreenThemeContext);

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
      <InputWrapper>
        <AntDesign 
          name="search1" 
          size={24}
          color={screenTheme === 'dark' ? "white" : "black"} 
        />

        <Input
          onChangeText={handleSearch} 
          placeholder="Título, personagem ou gênero"
          placeholderTextColor="#767676" 
        />
      </InputWrapper>

      {isLoading && ( <Loading size={'large'} fullwidth={true} /> )}

      {movies.length > 0 && !isLoading && (
        <ListMovies>
          {movies.map(movie => (
            <MovieSearchCard 
              openModalAddMovie={openModalAddMovie} 
              movie={movie} 
              key={movie.id}
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
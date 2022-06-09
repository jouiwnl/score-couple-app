import React from 'react'

import { 
  Wrapper, 
  ModalHeader, 
  MovieInformation, 
  Footer, 
  MovieExistIndicatorWrapper,
  MovieExistIndicator,
  MovieExistIndicatorLabel,
  MovieDescription, 
  SaveButton, 
  CancelButton, 
  ButtonLabel 
} from './styles'

import axios from 'axios';
import { API_KEY, apiURL } from '../../utils/api'

import { auth } from '../../../firebase';

import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import { View } from 'react-native';

export default function({ movie, handleCloseModalAdd, columnid }) {

  const navigate = useNavigation();
  const [isSaving, setIsSaving] = React.useState(false);
  const [hasMovie, setHasMovie] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(auth.currentUser.email);

  React.useEffect(() => {
    getUser();
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    if (movie) {
      const API_URL_MOVIE_ID = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&query=`;
      apiURL.get(`/users/${user}`).then(({ data }) => {
        setUser(data)
        return data.workspace.colunas;
      }).then((colunas) => {
        hasAnyMovie(colunas);
        
        axios.get(API_URL_MOVIE_ID).then(async (response) => {
          setSelectedMovie(response.data)
          return false
        }).finally(setIsLoading);
      })
    }
  }, [movie])

  async function getUser() {
    await apiURL.get(`/users/${auth.currentUser.email}`).then(response => {
      setUser(response.data)
    });
  }

  function hasAnyMovie(colunas) {
    let allMovies = [];
    colunas.forEach(coluna => coluna.movies.forEach(insideMovie => allMovies.push(insideMovie)));
    setHasMovie(allMovies.some(insideMovie => insideMovie.name === movie.title));
  }

  async function save() {
    setIsSaving(true);
    const movie = mountMovie();
    let promise = apiURL.post(`/movies?columnid=${columnid}`, movie);
    promise.then((response) => {
      handleCloseModalAdd(movie);
      navigate.navigate('Workspace');
      return false;
    }).finally(setIsSaving);
  }

  function mountMovie() {
    const finalMovie = {
      name: selectedMovie.title,
      posterUrl: selectedMovie.poster_path,
      releaseDate: selectedMovie.release_date,
      runtime: selectedMovie.runtime,
      genre: (selectedMovie.genres.length ? selectedMovie.genres[0].name : ''),
      movieDescription: selectedMovie.overview.split('.')[0]
    }

    return finalMovie;
  }

  return (
    <Wrapper>
      {isLoading && (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <Loading size={"large"}   />
        </View>
      )}

      {!isLoading && (
        <>
          <ModalHeader>{movie.title}</ModalHeader>

          {hasMovie && (
            <MovieExistIndicatorWrapper>
              <MovieExistIndicator>
                <MovieExistIndicatorLabel>Já adicionado</MovieExistIndicatorLabel>
              </MovieExistIndicator>
            </MovieExistIndicatorWrapper>
          )}

          <MovieInformation>
            <MovieDescription>{movie.overview}</MovieDescription>
          </MovieInformation>
    
          <Footer>
            <SaveButton disabled={hasMovie} isDisabled={hasMovie} onPress={save}>
              {isSaving && (
                <Loading size={"small"}   />
              )}
    
              {!isSaving && (
                <ButtonLabel >Adicionar</ButtonLabel>
              )}
            </SaveButton>
            
            <CancelButton onPress={handleCloseModalAdd}>
                <ButtonLabel>Cancelar</ButtonLabel>
            </CancelButton>
          </Footer>
        </>
      )}
      
    </Wrapper>
  )
}
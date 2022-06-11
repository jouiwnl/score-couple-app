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
  ButtonLabel,
  ProvidersWrapper,
  ProviderLogo
} from './styles'

import axios from 'axios';
import { API_KEY, apiURL, API_BASE_MOVIE, API_LOGO_IMAGE } from '../../utils/api'

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
  const [providers, setProviders] = React.useState([]);

  React.useEffect(() => {
    getUser();
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    if (movie) {
      apiURL.get(`/users/${user}`).then(({ data }) => {
        setUser(data)
        return data.workspace.colunas;
      }).then((colunas) => {
        hasAnyMovie(colunas);
        
        axios.get(`${API_BASE_MOVIE}${movie.id}?api_key=${API_KEY}`)
        .then(response => setSelectedMovie(response.data))
        .then(getProviders)
        .finally(() => setIsLoading(false));
      })
    }
  }, [movie])

  async function getUser() {
    await apiURL.get(`/users/${auth.currentUser.email}`).then(response => {
      setUser(response.data)
    });
  }

  function getProviders() {
    axios.get(`${API_BASE_MOVIE}${movie.id}/watch/providers?api_key=${API_KEY}`)
    .then(response => {
      if (response.data.results.BR) {
        setProviders(response.data.results.BR.flatrate)
      }
    })
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
      originalId: selectedMovie.id,
      name: selectedMovie.title,
      posterUrl: selectedMovie.poster_path,
      releaseDate: selectedMovie.release_date,
      runtime: selectedMovie.runtime,
      genre: (selectedMovie.genres.length ? selectedMovie.genres[0].name : ''),
      movieDescription: selectedMovie.overview.split('.')[0],
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

          {providers && providers.length > 0 && (
            <ProvidersWrapper>
              {providers.map(provider => (
                <ProviderLogo 
                  key={String(Math.random())} 
                  source={{ uri: `${API_LOGO_IMAGE}${provider.logo_path}` }} 
                />
              ))}
            </ProvidersWrapper>
          )}
    
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
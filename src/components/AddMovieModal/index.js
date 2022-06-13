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

import Loading from '../Loading';
import { View } from 'react-native';
import { NavigationContext } from '../../contexts/navigation';
import { AuthContext } from '../../contexts/auth';
import { GenericContext } from '../../contexts/generic';

export default function({ handleCloseModalAdd, columnid }) {

  const navigate = React.useContext(NavigationContext);
  const { movie, setMovie } = React.useContext(GenericContext);
  const { user } = React.useContext(AuthContext);

  const [isSaving, setIsSaving] = React.useState(false);
  const [hasMovie, setHasMovie] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [providers, setProviders] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    if (movie) {
      hasAnyMovie(user.workspace.colunas);
        
      axios.get(`${API_BASE_MOVIE}${movie.id}?api_key=${API_KEY}&language=pt-BR`)
        .then(response => setMovie(response.data))
        .then(getProviders)
        .finally(() => setIsLoading(false));
    }
  }, [])

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
    promise.then(() => {
      handleCloseModalAdd(movie);
      navigate.navigate('Workspace');
      return false;
    });
  }

  function mountMovie() {
    const finalMovie = {
      originalId: movie.id,
      name: movie.title,
      posterUrl: movie.poster_path,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      genre: (movie.genres.length ? movie.genres[0].name : ''),
      movieDescription: movie.overview,
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
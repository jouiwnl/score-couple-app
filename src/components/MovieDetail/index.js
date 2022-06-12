import React from 'react'
import { AirbnbRating } from 'react-native-ratings';
import ModalFooter from '../ModalMovieFooter';
import ModalHeader from '../ModalMovieHeader';
import Loading from '../Loading';

import { status } from '../../utils/status';

import { Platform } from 'react-native'; 

import { 
  Wrapper, 
  Main, 
  MovieTitle, 
  MovieDescription,
  MovieRating, 
  ButtonLabel, 
  SetStatusButtonWrapper, 
  SetStatusButton,
  ModalWrapper,
  ModalStatusHeader,
  ModalItemWrapper,
  ModalItemIcon,
  ModalItemDescription,
  ProvidersWrapper,
  ProviderLogo
} from './styles';

import { Modalize } from 'react-native-modalize';
import axios from 'axios';
import { API_BASE_MOVIE, API_KEY, API_LOGO_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';

export default function({ handleCloseMovie }) {
  const { movie, setMovie } = React.useContext(GenericContext);
  const movieRef = React.useRef(null);

  const [providers, setProviders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getProviders();
  }, [])

  function handleScore(value) {
    setMovie({ ...movie, score: value })
  }

  function handleSelectStatus(item) {
    setMovie({ ...movie, status: item.value });
    handleCloseInsideModal();
  }

  function openModalMovie() {
    movieRef.current?.open();
  }

  function handleCloseInsideModal(item) {
    movieRef.current?.close();
  }

  function defineStatus() {
    const finalStatus = status.find(e => e.value === movie.status);
    return finalStatus;
  }

  async function getProviders() {
    setIsLoading(true)
    if (movie.originalId) {
      let promise = axios.get(`${API_BASE_MOVIE}${movie.originalId}/watch/providers?api_key=${API_KEY}`)
      if (promise) {
        promise.then(response => {
          if (response.data.results.BR) {
            setProviders(response.data.results.BR.flatrate)
          }
        })
      } 
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 750)
  }

  return (
    <>
      <Wrapper>
        <ModalHeader />

        <Main>
          <MovieTitle>
            {movie.name}
          </MovieTitle>

          <MovieDescription>
            {movie.movieDescription}
          </MovieDescription>

          {isLoading && (
            <Loading size={'small'} />
          )}

          {!isLoading && providers && (
            <ProvidersWrapper>
              {providers.map(provider => (
                <ProviderLogo 
                  key={String(Math.random())} 
                  source={{ uri: `${API_LOGO_IMAGE}${provider.logo_path}` }} 
                />
              ))}
            </ProvidersWrapper>
          )}

          <SetStatusButtonWrapper>
            <SetStatusButton color={defineStatus().color} onPress={openModalMovie}>
              <ButtonLabel color={defineStatus().color}>
                {defineStatus().description}
              </ButtonLabel>
            </SetStatusButton>
          </SetStatusButtonWrapper>
          
          {(movie.status == 'CANCELED' || movie.status == 'COMPLETED') && (
             <MovieRating>
                <AirbnbRating
                  defaultRating={!movie.score ? 0 : movie.score} 
                  ratingContainerStyle={{ 
                    marginTop: Platform.OS === 'android' ? -33 : -20,
                    marginBottom: Platform.OS === 'android' ? -25 : 0
                  }} 
                  size={25} 
                  reviews={[""]}
                  onFinishRating={handleScore}
                />
              </MovieRating>
          )}
         
        </Main>

        <ModalFooter handleCloseMovie={handleCloseMovie} />
      </Wrapper>

      <Modalize 
        snapPoint={Platform.OS === 'android' ? 400 : 650} 
        modalHeight={Platform.OS === 'android' ? 400 : 650}
        modalStyle={{ backgroundColor: '#000014' }}
        ref={movieRef}
      >
        <ModalWrapper>
          <ModalStatusHeader>{defineStatus().description}</ModalStatusHeader>
          {status.map((item) => (
            <ModalItemWrapper 
              onPress={() => 
              handleSelectStatus(item)} 
              key={String(Math.random())}
            >
              <ModalItemIcon>
                <item.icon />
              </ModalItemIcon>
              
              <ModalItemDescription>{item.description}</ModalItemDescription>
            </ModalItemWrapper>
          ))}
        </ModalWrapper>
      </Modalize>
    </>
    
  )
}

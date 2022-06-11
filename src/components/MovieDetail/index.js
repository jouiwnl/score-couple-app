import React from 'react'
import { AirbnbRating } from 'react-native-ratings';
import ModalFooter from '../ModalMovieFooter';
import ModalHeader from '../ModalMovieHeader';

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


export default function({ movie, handleCloseMovie }) {
  const movieRef = React.useRef(null);
  const [selectedMovie, setSelectedMovie] = React.useState(movie);
  const [providers, setProviders] = React.useState([]);

  React.useEffect(() => {
    getProviders();
  }, [])

  function handleScore(value) {
    setSelectedMovie({ ...selectedMovie, score: value })
  }

  function handleSelectStatus(item) {
    setSelectedMovie({ ...selectedMovie, status: item.value });
    handleCloseInsideModal();
  }

  function openModalMovie() {
    movieRef.current?.open();
  }

  function handleCloseInsideModal(item) {
    movieRef.current?.close();
  }

  function defineStatus() {
    const finalStatus = status.find(e => e.value === selectedMovie.status);
    return finalStatus;
  }

  function getProviders() {
    if (movie.originalId) {
      axios.get(`${API_BASE_MOVIE}${movie.originalId}/watch/providers?api_key=${API_KEY}`)
      .then(response => {
        if (response.data.results.BR) {
          setProviders(response.data.results.BR.flatrate)
        }
      })
    }
  }

  return (
    <>
      <Wrapper>
        <ModalHeader movie={selectedMovie} />

        <Main>
          <MovieTitle>
            {selectedMovie.name}
          </MovieTitle>

          <MovieDescription>
            {selectedMovie.movieDescription}
          </MovieDescription>

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

          <SetStatusButtonWrapper>
            <SetStatusButton color={defineStatus().color} onPress={openModalMovie}>
              <ButtonLabel color={defineStatus().color}>
                {defineStatus().description}
              </ButtonLabel>
            </SetStatusButton>
          </SetStatusButtonWrapper>
          
          {(selectedMovie.status == 'CANCELED' || selectedMovie.status == 'COMPLETED') && (
             <MovieRating>
                <AirbnbRating
                  defaultRating={!selectedMovie.score ? 0 : selectedMovie.score} 
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

        <ModalFooter handleCloseMovie={handleCloseMovie} movie={selectedMovie} />
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

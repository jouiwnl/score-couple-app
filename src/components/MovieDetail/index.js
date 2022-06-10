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
  ModalItemDescription
} from './styles';

import { Modalize } from 'react-native-modalize';


export default function({ movie, handleCloseMovie }) {
  const movieRef = React.useRef(null);
  const [selectedMovie, setSelectedMovie] = React.useState(movie);

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
        snapPoint={Platform.OS === 'android' ? 375 : 650} 
        modalStyle={{ backgroundColor: '#000014', flex: 1 }}
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

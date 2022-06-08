import React from 'react'

import { 
  Wrapper, 
  MovieImage, 
  Main, 
  MovieTitle, 
  MovieDescription,
  SaveButton, 
  ButtonLabel, 
  CancelButton, 
  Footer,
  SetStatusButtonWrapper, 
  SetStatusButton,
  ModalWrapper,
  ModalStatusHeader,
  ModalItemWrapper,
  ModalItemIcon,
  ModalItemDescription,
  StatusLabel
} from './styles'

import { status } from '../../utils/status'

import Loading from '../../components/Loading'
import ConfettiCannon from 'react-native-confetti-cannon'
import { ActivityIndicator } from 'react-native'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'
import { Modalize } from 'react-native-modalize'

export default function({ navigateTo, handleAlterItem }) {

  const API_IMAGE = `https://image.tmdb.org/t/p/w400`;
  let movie = {
    posterUrl: "",
    name: "",
    movieDescription: "",
    score: ""
  }

  let insideStatus = { color: "", description: "" };

  const movieRef = React.useRef(null)

  const [selectedMovie, setSelectedMovie] = React.useState(movie)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [thisStatus, setThisStatus] = React.useState(insideStatus)
  const [isLoadingButton, setIsLoadingButton] = React.useState(false)
  
  React.useEffect(() => {
    load();
  }, [])

  async function save() {
    setIsSaving(true);
    let promise = axios.put(`https://score-couple.herokuapp.com/movies/${selectedMovie.id}`, selectedMovie);
    promise.then((response) => {
      navigateTo('Workspace');
      handleAlterItem(response.data);
      return false;
    }).finally(setIsSaving);
  }

  function load(tryAgain) {
    if (tryAgain) {
      setIsLoadingButton(true)
    } else {
      setIsLoading(true)
    }
    
    axios.get(`https://score-couple.herokuapp.com/workspaces/10/shuffle`).then(response => {
			setSelectedMovie(response.data)
      setThisStatus(status.find(e => e.value === response.data.status));
			return false;
		}).finally((value) => {
      if (tryAgain) {
        setIsLoadingButton(value)
      } else {
        setIsLoading(value)
      }
    });
  }

  function handleSelectStatus(item) {
    setSelectedMovie({ ...selectedMovie, status: item.value });
    setThisStatus(item);
    handleCloseInsideModal();
  }
  

  function openModalMovie() {
    movieRef.current?.open();
  }

  function handleCloseInsideModal() {
    movieRef.current?.close();
  }

  return(
    <>
      <Wrapper>
        {isLoading && ( <Loading /> )}

        {!isLoading && (
          <>
            <ConfettiCannon
              count={200}
              origin={{x: -20, y: -10}}
              autoStart={true}
              fadeOut={true}
              explosionSpeed={750}
            />

            <MovieImage source={{ uri: `${API_IMAGE.concat(selectedMovie.posterUrl)}` }}>
              <LinearGradient colors={['#00000000', '#000014']} style={{height : '100%', width : '100%'}} />
            </MovieImage>

            <Main>
              <MovieTitle>
                {selectedMovie.name}
              </MovieTitle>

              <MovieDescription>
                {selectedMovie.movieDescription}
              </MovieDescription>
              
              <SetStatusButtonWrapper>
                <SetStatusButton color={thisStatus.color} onPress={openModalMovie}>
                  <StatusLabel color={thisStatus.color}>
                    {thisStatus.description}
                  </StatusLabel>
                </SetStatusButton>
              </SetStatusButtonWrapper>
              
            </Main>

            <Footer>
              <SaveButton onPress={save}>
                {isSaving && (
                  <ActivityIndicator size="small" color="white" />
                )}

                {!isSaving && (
                  <ButtonLabel>Salvar</ButtonLabel>
                )}
              </SaveButton>
              
              <CancelButton onPress={() => load(true)}>
                {isLoadingButton && (
                  <ActivityIndicator size="small" color="white" />
                )}

                {!isLoadingButton && (
                  <ButtonLabel>Tente novamente!</ButtonLabel>
                )}
              </CancelButton>
            </Footer>
          </>
        )}
        </Wrapper>
        <Modalize 
          snapPoint={400} 
          modalStyle={{ backgroundColor: '#000014', flex: 1 }}
          ref={movieRef}
        >
          <ModalWrapper>
          <ModalStatusHeader>{thisStatus.description}</ModalStatusHeader>
          {status.map((item) => (
            <ModalItemWrapper onPress={() => handleSelectStatus(item)} key={String(Math.random())}>
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
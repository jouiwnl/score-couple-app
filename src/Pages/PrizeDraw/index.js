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
import { LinearGradient } from 'expo-linear-gradient'
import { Modalize } from 'react-native-modalize'

import { useNavigation } from '@react-navigation/native'

import { apiURL, API_IMAGE } from '../../utils/api' 
import { AuthContext } from '../../contexts/auth'
import { GenericContext } from '../../contexts/generic'

export default function() {

  const navigate = useNavigation();
  const {user, getUser} = React.useContext(AuthContext);
  const { movie, setMovie } = React.useContext(GenericContext);

  let insideStatus = { color: "", description: "" };

  const movieRef = React.useRef(null)
  const explosionRef = React.useRef(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [thisStatus, setThisStatus] = React.useState(insideStatus)
  const [isLoadingButton, setIsLoadingButton] = React.useState(false)
  const [showConffeti, setShowConffeti] = React.useState(true)
  
  React.useEffect(() => {
    load();
  }, [])

  async function save() {
    setIsSaving(true);
    let promise = apiURL.put(`/movies/${movie.id}`, movie);
    promise.then((response) => {
      navigate.navigate('Workspace');
      getUser(user.email, true)
      return false;
    }).finally(setIsSaving);
  }

  async function load(tryAgain) {
    if (tryAgain) {
      setIsLoadingButton(true)
    } else {
      setIsLoading(true)
    }
    
    apiURL.get(`/workspaces/${user.workspace.id}/shuffle`).then(response => {
			setMovie(response.data)
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
    setMovie({ ...movie, status: item.value });
    setThisStatus(item);
    handleCloseInsideModal();
  }

  function openModalMovie() {
    movieRef.current?.open();
  }

  function handleCloseInsideModal() {
    movieRef.current?.close();
  }

  function stopExplosion() {
    setTimeout(() => {
      setShowConffeti(false)
    }, 1100)
  }

  return(
    <>
      <Wrapper>
        {isLoading && !movie && ( <Loading size={'large'} fullwidth={true} /> )}

        {movie && !isLoading && (
          <>
            {showConffeti && (
              <ConfettiCannon
                count={200}
                origin={{x: -20, y: -10}}
                autoStart={true}
                fadeOut={true}
                explosionSpeed={750}
                ref={explosionRef}
                onAnimationEnd={stopExplosion}
              />
            )}
            

            <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
              <LinearGradient colors={['#00000000', '#000014']} style={{ flex: 1 }} />
            </MovieImage>

            <Main>
              <MovieTitle>
                {movie.name}
              </MovieTitle>

              <MovieDescription>
                {movie.movieDescription}
              </MovieDescription>
              
              <SetStatusButtonWrapper>
                <SetStatusButton color={thisStatus.color} onPress={openModalMovie}>
                  <StatusLabel color={String(thisStatus.color)}>
                    {thisStatus.description}
                  </StatusLabel>
                </SetStatusButton>
              </SetStatusButtonWrapper>
              
            </Main>

            <Footer>
              <SaveButton onPress={save}>
                {isSaving && (
                  <Loading size={"small"}   />
                )}

                {!isSaving && (
                  <ButtonLabel>Salvar</ButtonLabel>
                )}
              </SaveButton>
              
              <CancelButton onPress={() => load(true)}>
                {isLoadingButton && (
                  <Loading size={"small"}   />
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
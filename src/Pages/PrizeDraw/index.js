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
  StatusLabel,
  ProvidersWrapper,
  ProviderLogo,
  NotFoundWrapper, 
  NotFoundDescription
} from './styles'

import { status } from '../../utils/status'

import Loading from '../../components/Loading'
import ConfettiCannon from 'react-native-confetti-cannon'
import { LinearGradient } from 'expo-linear-gradient'
import { Modalize } from 'react-native-modalize'

import { useNavigation } from '@react-navigation/native'

import { apiURL, API_BASE_MOVIE, API_IMAGE, API_KEY, API_LOGO_IMAGE } from '../../utils/api' 
import { AuthContext } from '../../contexts/auth'
import { GenericContext } from '../../contexts/generic'
import axios from 'axios'
import { ScreenThemeContext } from '../../contexts/theme'

export default function() {

  const navigate = useNavigation();
  const { screenTheme } = React.useContext(ScreenThemeContext);
  const {user, getUser, workspace} = React.useContext(AuthContext);
  const { movie, setMovie } = React.useContext(GenericContext);

  const movieRef = React.useRef(null)
  const explosionRef = React.useRef(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [thisStatus, setThisStatus] = React.useState({ color: "", description: "" })
  const [isLoadingButton, setIsLoadingButton] = React.useState(false)
  const [showConffeti, setShowConffeti] = React.useState(true)
  const [providers, setProviders] = React.useState([]);
  
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
    
    apiURL.get(`/workspaces/${workspace.id}/shuffle`).then(response => {
			setMovie(response.data)
      setThisStatus(status.find(e => e.value === response.data.status));
      return response.data;
		}).then((movie) => {
      getProviders(movie);
      return false;
    }).finally((value) => {
      if (tryAgain) {
        setIsLoadingButton(value)
      } else {
        setIsLoading(value)
      }
    });
  }

  async function getProviders(movie) {
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
        {isLoading && (
          <Loading size={'large'} fullwidth={true} />
        )}

        {movie.id && !isLoading && (
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
              <LinearGradient 
                colors={[screenTheme === 'dark' ? '#000014' : '#fff', '#00000000' ]} 
                style={{ flex: 1 }}
              />
              <LinearGradient 
                colors={['#00000000', screenTheme === 'dark' ? '#000014' : '#fff']} 
                style={{ flex: 1 }} 
              />
            </MovieImage>

            <MovieTitle numberOfLines={2}>
              {movie.name}
            </MovieTitle>

            <Main>
              <MovieDescription>
                {movie.movieDescription}
              </MovieDescription>

              {providers && (
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
                <SetStatusButton color={String(thisStatus.color)} onPress={openModalMovie}>
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
                  <Loading size={"small"} />
                )}

                {!isLoadingButton && (
                  <ButtonLabel>Tente novamente!</ButtonLabel>
                )}
              </CancelButton>
            </Footer>

            <Modalize 
              snapPoint={400} 
              modalStyle={{ 
                backgroundColor: screenTheme === 'dark' ? '#000014' : '#fff', flex: 1 
              }}
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
        )}

        {!isLoading && !movie.id && (
          <NotFoundWrapper>
            <NotFoundDescription>Não foi encontrado nenhum filme apto para sortear!</NotFoundDescription>
          </NotFoundWrapper>
        )}

      </Wrapper>
    </>
  )
}
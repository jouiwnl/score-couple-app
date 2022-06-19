import React from 'react'

import { 
  Wrapper, 
  MediaImage, 
  Main, 
  MediaTitle, 
  MediaDescription,
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

import { apiURL, API_BASE_MOVIE, API_BASE_SERIE, API_IMAGE, API_KEY, API_LOGO_IMAGE } from '../../utils/api' 
import { AuthContext } from '../../contexts/auth'
import { GenericContext } from '../../contexts/generic'
import axios from 'axios'
import { ScreenThemeContext } from '../../contexts/theme'
import MediaProvider, { MediaContext } from '../../contexts/media'

export default function() {

  const navigate = useNavigation();
  const { screenTheme } = React.useContext(ScreenThemeContext);
  const {user, getUser, workspace} = React.useContext(AuthContext);
  const { media, setMedia } = React.useContext(GenericContext);
  const { mediaType } = React.useContext(MediaContext);

  const mediaRef = React.useRef(null)
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
    let promise = apiURL.put(`/medias/${media.id}`, media);
    promise.then((response) => {
      navigate.navigate('Workspace');
      getUser(user.email, true)
      return false;
    }).finally(setIsSaving);
  }

  async function load(tryAgain) {
    setMedia({})
    if (tryAgain) {
      setIsLoadingButton(true)
    } else {
      setIsLoading(true)
    }
    
    apiURL.get(`/workspaces/${workspace.id}/shuffle`).then(response => {
			setMedia(response.data)
      setThisStatus(status.find(e => e.value === response.data.status));
      return response.data;
		}).then((media) => {
      getProviders(media);
      return false;
    }).catch(error => {
      console.log(error.response.data)
    }).finally((value) => {
      if (tryAgain) {
        setIsLoadingButton(value)
      } else {
        setIsLoading(value)
      }
    });
  }

  async function getProviders(media) {
    if (media.originalId) {
      let promise = axios.get(`${media.mediaType === 'movies' ? API_BASE_MOVIE : API_BASE_SERIE}${media.originalId}/watch/providers?api_key=${API_KEY}`)
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
    setMedia({ ...media, status: item.value });
    setThisStatus(item);
    handleCloseInsideModal();
  }

  function openModalMedia() {
    mediaRef.current?.open();
  }

  function handleCloseInsideModal() {
    mediaRef.current?.close();
  }

  function stopExplosion() {
    setTimeout(() => {
      setShowConffeti(false)
    }, 1100)
  }

  return(
    <Wrapper>
      {isLoading && (
        <Loading size={'large'} fullwidth={true} />
      )}

      {media.id && !isLoading && (
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
          

          <MediaImage source={{ uri: `${API_IMAGE.concat(media.posterUrl)}` }}>
            <LinearGradient 
              colors={[screenTheme === 'dark' ? '#000014' : '#fff', '#00000000' ]} 
              style={{ flex: 1 }}
            />
            <LinearGradient 
              colors={['#00000000', screenTheme === 'dark' ? '#000014' : '#fff']} 
              style={{ flex: 1 }} 
            />
          </MediaImage>

          <MediaTitle numberOfLines={2}>
            {media.name}
          </MediaTitle>

          <Main>
            <MediaDescription>
              {media.mediaDescription}
            </MediaDescription>

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
              <SetStatusButton color={String(thisStatus.color)} onPress={openModalMedia}>
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
            ref={mediaRef}
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

      {!isLoading && !media.id && (
        <NotFoundWrapper>
          <NotFoundDescription>Não foi encontrado nenhum filme apto para sortear!</NotFoundDescription>
        </NotFoundWrapper>
      )}

    </Wrapper>
  )
}
import React from 'react'
import Loading from '../Loading';

import { status } from '../../utils/status';

import { 
  Wrapper, 
  Main, 
  MediaTitle, 
  MediaDescription,
  MediaRating, 
  ButtonStatusLabel, 
  SetStatusButtonWrapper, 
  SetStatusButton,
  ModalWrapper,
  ModalStatusHeader,
  ModalItemWrapper,
  ModalItemIcon,
  ModalItemDescription,
  ProvidersWrapper,
  ProviderLogo,
  MediaImage,
  ButtonLabel,
  DeleteButton,
  FooterWrapper,
  SaveButton
} from './styles';

import { Modalize } from 'react-native-modalize';
import axios from 'axios';
import { apiURL, API_BASE_MOVIE, API_BASE_SERIE, API_IMAGE, API_KEY, API_LOGO_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';
import StarRating from 'react-native-star-rating-widget';
import { ScreenThemeContext } from '../../contexts/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MediaContext } from '../../contexts/media';

export default function({ handleCloseMedia }) {
  const mediaRef = React.useRef(null);

  const { media, setMedia } = React.useContext(GenericContext);
  const { screenTheme } = React.useContext(ScreenThemeContext);
  const { mediaType } = React.useContext(MediaContext);

  const [providers, setProviders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [date, setDate] = React.useState(new Date())
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    getProviders();
  }, [])

  function handleScore(value) {
    if (value == media.score) return;
    setMedia({ ...media, score: value })
  }

  function handleSelectStatus(item) {
    setMedia({ ...media, status: item.value });
    handleCloseInsideModal();
  }

  function openModalMedia() {
    mediaRef.current?.open();
  }

  function handleCloseInsideModal(item) {
    mediaRef.current?.close();
  }

  function defineStatus() {
    const finalStatus = status.find(e => e.value === media.status);
    return finalStatus;
  }

  async function getProviders() {
    setIsLoading(true)
    if (media.originalId) {
      let promise = axios.get(`${media.mediaType === 'media' ? API_BASE_MOVIE : API_BASE_SERIE}${media.originalId}/watch/providers?api_key=${API_KEY}`)
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

  async function save() {
    setIsSaving(true);

    let promise = apiURL.put(`/medias/${media.id}`, media);
    promise.then((response) => {
      handleCloseMedia(media);
      return false;
    }).finally(setIsSaving);
  }

  async function remove() {
    setIsDeleting(true);

    Alert.alert(
      "Confirmação",
      `Tem certeza que deseja excluir ${media.name}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            let promise = apiURL.delete(`/medias/${media.id}`);
            promise.then(() => {
              handleCloseMedia(media);
              return false;
            }).finally(setIsDeleting)
          }
        },
        {
          text: "Não",
          onPress: () => setIsDeleting(false)
        }
      ]
    )
  }

  return (
    <>
      <Wrapper>
        <MediaImage source={{ uri: `${API_IMAGE.concat(media.posterUrl)}` }}>
          <LinearGradient
            colors={['#00000000', screenTheme === 'dark' ? '#000014' : '#fff']} 
            style={{ flex: 1 }} 
          />
        </MediaImage>

        <Main>
          <MediaTitle>
            {media.name}
          </MediaTitle>

          <MediaDescription>
            {media.mediaDescription}
          </MediaDescription>

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
            <SetStatusButton color={defineStatus().color} onPress={openModalMedia}>
              <ButtonStatusLabel color={defineStatus().color}>
                {defineStatus().description}
              </ButtonStatusLabel>
            </SetStatusButton>
          </SetStatusButtonWrapper>
          
          {(media.status == 'CANCELED' || media.status == 'COMPLETED') && (
            <MediaRating>
              <StarRating
                rating={!media.score ? 0 : media.score}
                onChange={handleScore}
                maxStars={5}
                minRating={0.5} 
                starSize={30}
                color="#fdd835"
                animationConfig={{
                  delay: 0
                }}
              />
            </MediaRating>
          )}
         
        </Main>

        <FooterWrapper>
          <SaveButton onPress={save}>
            {isSaving && (
              <Loading size={"small"}   />
            )}

            {!isSaving && (
              <ButtonLabel>Salvar</ButtonLabel>
            )}
          </SaveButton>

          <DeleteButton onPress={remove}>
            {isDeleting && (
              <Loading size={"small"}   />
            )}

            {!isDeleting && (
              <ButtonLabel>Apagar</ButtonLabel>
            )}
          </DeleteButton>
        </FooterWrapper>

        <Modalize 
          snapPoint={300} 
          modalHeight={300}
          modalStyle={{ 
            backgroundColor: screenTheme === 'dark' ? '#000014' : '#fff',
            flex: 0.7
          }}
          ref={mediaRef}
        >
          <ModalWrapper>
            <ModalStatusHeader>{defineStatus().description}</ModalStatusHeader>
            {status.map((item) => (
              <ModalItemWrapper 
                onPress={() => handleSelectStatus(item)} 
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
      </Wrapper>
    </>
    
  )
}

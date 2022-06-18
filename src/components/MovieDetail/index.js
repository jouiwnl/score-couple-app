import React from 'react'
import Loading from '../Loading';

import { status } from '../../utils/status';

import { 
  Wrapper, 
  Main, 
  MovieTitle, 
  MovieDescription,
  MovieRating, 
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
  MovieImage,
  ButtonLabel,
  DeleteButton,
  FooterWrapper,
  SaveButton
} from './styles';

import { Modalize } from 'react-native-modalize';
import axios from 'axios';
import { apiURL, API_BASE_MOVIE, API_IMAGE, API_KEY, API_LOGO_IMAGE } from '../../utils/api';
import { GenericContext } from '../../contexts/generic';
import StarRating from 'react-native-star-rating-widget';
import { ScreenThemeContext } from '../../contexts/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';

export default function({ handleCloseMovie }) {
  const movieRef = React.useRef(null);

  const { movie, setMovie } = React.useContext(GenericContext);
  const { screenTheme } = React.useContext(ScreenThemeContext);

  const [providers, setProviders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    getProviders();
  }, [])

  function handleScore(value) {
    if (value == movie.score) return;
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

  async function save() {
    setIsSaving(true);

    let promise = apiURL.put(`/movies/${movie.id}`, movie);
    promise.then((response) => {
      handleCloseMovie(movie);
      return false;
    }).finally(setIsSaving);
  }

  async function remove() {
    setIsDeleting(true);

    Alert.alert(
      "Confirmação",
      `Tem certeza que deseja excluir o filme ${movie.name}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            let promise = apiURL.delete(`/movies/${movie.id}`);
            promise.then(() => {
              handleCloseMovie(movie);
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
        <MovieImage source={{ uri: `${API_IMAGE.concat(movie.posterUrl)}` }}>
          <LinearGradient
            colors={['#00000000', screenTheme === 'dark' ? '#000014' : '#fff']} 
            style={{ flex: 1 }} 
          />
        </MovieImage>

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
              <ButtonStatusLabel color={defineStatus().color}>
                {defineStatus().description}
              </ButtonStatusLabel>
            </SetStatusButton>
          </SetStatusButtonWrapper>
          
          {(movie.status == 'CANCELED' || movie.status == 'COMPLETED') && (
            <MovieRating>
              <StarRating
                rating={!movie.score ? 0 : movie.score}
                onChange={handleScore}
                maxStars={5}
                minRating={0.5} 
                starSize={30}
                color="#fdd835"
                animationConfig={{
                  delay: 0
                }}
              />
            </MovieRating>
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
          ref={movieRef}
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

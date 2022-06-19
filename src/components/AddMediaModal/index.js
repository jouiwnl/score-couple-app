import React from 'react'

import { 
  Wrapper, 
  ModalHeader, 
  MediaInformation, 
  Footer, 
  MediaExistIndicatorWrapper,
  MediaExistIndicator,
  MediaExistIndicatorLabel,
  MediaDescription, 
  SaveButton, 
  CancelButton, 
  ButtonLabel,
  ProvidersWrapper,
  ProviderLogo
} from './styles'

import axios from 'axios';
import { API_KEY, apiURL, API_BASE_MOVIE, API_LOGO_IMAGE, getUrl, API_BASE_SERIE } from '../../utils/api'

import Loading from '../Loading';
import { View } from 'react-native';
import { NavigationContext } from '../../contexts/navigation';
import { AuthContext } from '../../contexts/auth';
import { GenericContext } from '../../contexts/generic';
import { MediaContext } from '../../contexts/media';

export default function({ handleCloseModalAdd, columnid }) {

  const navigate = React.useContext(NavigationContext);
  const { media, setMedia } = React.useContext(GenericContext);
  const { workspace } = React.useContext(AuthContext);
  const { mediaType } = React.useContext(MediaContext);

  const [isSaving, setIsSaving] = React.useState(false);
  const [hasMedia, setHasMedia] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [providers, setProviders] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    if (media) {
      hasAnyMedia(workspace.colunas);

      const url = getUrl(mediaType, media.id);
        
      axios.get(url)
        .then(response => setMedia(response.data))
        .then(getProviders)
        .finally(() => setIsLoading(false));
    }
  }, [])

  function getProviders() {
    axios.get(`${mediaType === 'Movies' ? API_BASE_MOVIE : API_BASE_SERIE}${media.id}/watch/providers?api_key=${API_KEY}`)
    .then(response => {
      if (response.data.results.BR) {
        setProviders(response.data.results.BR.flatrate)
      }
    })
  }

  function hasAnyMedia(colunas) {
    let allMedias = [];
    colunas.forEach(coluna => coluna.medias.forEach(insideMedia => allMedias.push(insideMedia)));
    setHasMedia(allMedias.some(insideMedia => insideMedia.name === (media.title ?? media.name)));
  }

  async function save() {
    setIsSaving(true);
    const media = mountMedia();
    let promise = apiURL.post(`/medias/column/${columnid}`, media);
    promise.then(() => {
      handleCloseModalAdd(media);
      navigate.navigate('Workspace');
      return false;
    });
  }

  function mountMedia() {
    const finalMedia = {
      originalId: media.id,
      name: media.title || media.name,
      posterUrl: media.poster_path,
      releaseDate: media.release_date,
      runtime: media.runtime,
      genre: (media.genres.length ? media.genres[0].name : ''),
      mediaDescription: media.overview,
      mediaType: mediaType === 'serie' ? 'SERIE' : 'MOVIE'
    }

    return finalMedia;
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
          <ModalHeader>{media.title || media.name}</ModalHeader>

          {hasMedia && (
            <MediaExistIndicatorWrapper>
              <MediaExistIndicator>
                <MediaExistIndicatorLabel>Já adicionado</MediaExistIndicatorLabel>
              </MediaExistIndicator>
            </MediaExistIndicatorWrapper>
          )}
        
          <MediaInformation>
            <MediaDescription>{media.overview}</MediaDescription>
          </MediaInformation>

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
            <SaveButton disabled={hasMedia} isDisabled={hasMedia} onPress={save}>
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
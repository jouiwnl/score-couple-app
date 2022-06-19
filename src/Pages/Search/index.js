import React from 'react';
import { apiMovieURL, apiSerieURL } from '../../utils/api'

import { 
  InputWrapper,
  Input, 
  Wrapper, 
  ListMedias, 
  AlertWrapper, 
  Message,
  MediaTypeButton,
  MediaTypeButtonLabel,
} from './styles'

import { AntDesign } from '@expo/vector-icons';

import MediaSearchCard from '../../components/MediaSearchCard';
import Loading from '../../components/Loading'

import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import axios from 'axios'
import { ScreenThemeContext } from '../../contexts/theme';
import { MediaContext } from '../../contexts/media';
import { Text } from 'react-native';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

export default function({ 
  openModalAddMedia,  
  columnId
}) {

  const route = useRoute();
  const { screenTheme } = React.useContext(ScreenThemeContext);
  const { mediaType, setMediaType } = React.useContext(MediaContext);

  const [inputValue, setInputValue] = React.useState("");
  const [medias, setMedias] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);

  React.useEffect(() => {
    if (route.params.columnId) {
      columnId(route.params?.columnId)
    }
  }, [])

  React.useEffect(() => {
    if (inputValue && inputValue != "") {
      search();
    }
  }, [mediaType])

  React.useEffect(() => {
    search();
  }, [inputValue])

  function handleMediaType(type) {
    if (type) {
      setMediaType(type)
      setMenuVisible(false)
    }
  }

  async function search() {
    setIsLoading(true);

    if (!inputValue && inputValue == "") {
      setMedias([]);
      setIsLoading(false);
    } else {
      setMedias([]);
      const url = mediaType === 'Movies' ? apiMovieURL : apiSerieURL;
      const delayDebounceFn = setTimeout(() => {
        axios.get(url.concat(inputValue)).then(response => {
          setMedias(response.data.results);
        }).finally(() => {
          setIsLoading(false);
        })
      }, 2000)
  
      return () => clearTimeout(delayDebounceFn)
    }
  }

  function handleSearch(text) {
    setInputValue(text);
  }

  return (
    <>
      <Wrapper>
        <InputWrapper>
          <AntDesign 
            name="search1" 
            size={24}
            color={screenTheme === 'dark' ? "white" : "black"} 
          />

          <Input
            onChangeText={handleSearch} 
            placeholder="Título, personagem ou gênero"
            placeholderTextColor="#767676" 
          />

          <Menu
            visible={menuVisible}
            anchor={
              <MediaTypeButton onPress={() => setMenuVisible(true)}>
                <MediaTypeButtonLabel>
                  <Text>{mediaType.toUpperCase()}</Text>
                  <AntDesign name="down" size={10} color="#767676" />
                </MediaTypeButtonLabel>
              </MediaTypeButton>
            }
            onRequestClose={() => setMenuVisible(false)}
          >
            <MenuItem onPress={() => handleMediaType('Movies')}>Movies</MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => handleMediaType('Series')}>Series</MenuItem>
          </Menu>

        </InputWrapper>

        {isLoading && ( <Loading size={'large'} fullwidth={true} /> )}

        {medias.length > 0 && !isLoading && (
          <ListMedias>
            {medias.map(media => (
              <MediaSearchCard 
                openModalAddMedia={openModalAddMedia} 
                media={media} 
                key={media.id}
              />
            ))}
          </ListMedias>
        )}

        {medias.length == 0 && !_.isEmpty(inputValue) && !isLoading && (
          <AlertWrapper>
            <Message>
              Nenhum resultado encontrado para a pesquisa: { inputValue }
            </Message>
          </AlertWrapper>
        )}
        
      </Wrapper>
    </>
  )
}
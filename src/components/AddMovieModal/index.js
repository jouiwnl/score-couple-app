import React from 'react'

import { Wrapper, ModalHeader, MovieInformation, Footer, MovieTitle, MovieDescription, SaveButton, CancelButton, ButtonLabel } from './styles'
import { ActivityIndicator, View } from 'react-native'

import axios from 'axios';
import { API_KEY, apiURL } from '../../utils/api'

import { useNavigation } from '@react-navigation/native';

export default function({ movie, handleCloseModalAdd, columnid }) {

  const navigate = useNavigation();
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (movie) {
      setIsLoading(true)
      const API_URL_ID = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&query=`;
      axios.get(API_URL_ID).then((response) => {
        setSelectedMovie(response.data)
        return false
      }).finally(setIsLoading);
    }
  }, [movie])

  async function save() {
    setIsSaving(true);
    const movie = mountMovie();
    let promise = apiURL.post(`/movies?columnid=${columnid}`, movie);
    promise.then((response) => {
      handleCloseModalAdd(movie);
      navigate.navigate('Workspace');
      return false;
    }).finally(setIsSaving);
  }

  function mountMovie() {
    const finalMovie = {
      name: selectedMovie.title,
      posterUrl: selectedMovie.poster_path,
      releaseDate: selectedMovie.release_date,
      runtime: selectedMovie.runtime,
      genre: (selectedMovie.genres.length ? selectedMovie.genres[0].name : ''),
      movieDescription: selectedMovie.overview.split('.')[0]
    }

    return finalMovie;
  }

  return (
    <Wrapper>
      {isLoading && (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      {!isLoading && (
        <>
          <ModalHeader>{movie.title}</ModalHeader>

          <MovieInformation>
            <MovieDescription>{movie.overview}</MovieDescription>
          </MovieInformation>
    
          <Footer>
            <SaveButton onPress={save}>
              {isSaving && (
                <ActivityIndicator size="small" color="white" />
              )}
    
              {!isSaving && (
                <ButtonLabel>Adicionar</ButtonLabel>
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
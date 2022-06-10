import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'; 

import MovieDetail from '../../components/MovieDetail';
import ColumnDetail from '../../components/ColumnDetail';

import Home from '../Home'
import Search from '../Search'
import CommingSoon from '../ComingSoon'

import { Modalize } from 'react-native-modalize';
import AddMovieModal from '../../components/AddMovieModal';
import PrizeDraw from '../PrizeDraw';

import { Platform, Dimensions } from 'react-native';
import Configs from '../Configs';

const { Navigator, Screen } = createBottomTabNavigator();

export default function() {
  const windowHeight = Dimensions.get('window').height;

  const movieRef = React.useRef(null);
  const columnRef = React.useRef(null);
  const movieToAddRef = React.useRef(null);

  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [selectedColumn, setSelectedColumn] = React.useState(null);
  const [selectedMovieToAdd, setSelectedMovieToAdd] = React.useState(null);
  const [columnId, setColumnId] = React.useState(null);
  const [hasAlterItem, setHasAlterItem] = React.useState(false);
  const [navigate, setNavigate] = React.useState(null);

  //OPENS
  function openModalMovie() {
    movieRef.current?.open();
  }

  function openModalColumn() {
    columnRef.current?.open();
  }

  function openModalAddMovie() {
    movieToAddRef.current?.open();
  }

  //HANDLES
  function handleSelectedMovie(movie) {
    setSelectedMovie(movie)
  }

  function handleSelectedColumn(column) {
    setSelectedColumn(column)
  }

  function handleSelectedMovieToAdd(movie) {
    setSelectedMovieToAdd(movie)
  }

  function handleColumnId(id) {
    setColumnId(id)
  }

  //CLOSES
  function handleCloseMovie(item) {
    movieRef.current?.close();
    handleAlterItem(item);
  }

  function handleCloseColumn(item) {
    columnRef.current?.close();
    handleAlterItem(item);
    setTimeout(() => {
      setSelectedColumn({})
    }, 1000)
  }

  function handleCloseModalAdd(item) {
    movieToAddRef.current?.close();
    handleAlterItem(item);
    setTimeout(() => {
      setNavigate(null);
      setSelectedMovieToAdd({})
    }, 1000)
  }

  //REFRESH WHEN ALTER
  function handleAlterItem(item) {
    setHasAlterItem(false);
    if (item) {
      setHasAlterItem(true);
    } else {
      setHasAlterItem(false);
    }
  }

  function handleSetNavigate(path) {
    setNavigate(null)
    setNavigate(path)
  }

  return (
    <>
      <Navigator
        initialRouteName='WorkSpace'
        swipe
        tabBarOptions={{
          style: {
            height: Platform.OS === 'android' ? 70 : 90,
            backgroundColor: '#000014',
            borderTopColor: '#464646'
          },
          tabStyle: {
            alignItems: 'center',
            justifyContent: 'center',
          },
          iconStyle: {
            flex: 0,
            width: 23,
            height: 23,
          },
          labelStyle: {
            fontSize: 11,
            marginTop: 5,
          },
          inactiveTintColor: '#464646',
          activeTintColor: '#FFF',
        }}
      >
        <Screen
          name="Workspace"
          children={() => (
            <Home 
              hasAlterItem={hasAlterItem} 
              openModalMovie={openModalMovie} 
              openModalColumn={openModalColumn}
              handleSelectedMovie={handleSelectedMovie} 
              handleSelectedColumn={handleSelectedColumn}
              navigate={navigate}
            />
          )}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <MaterialIcons 
                  name="workspaces-filled" 
                  size={24} 
                  color={focused ? '#FFF' : '#464646'}
                />
              );
            },
          }}
        />

        <Screen
          name="Sortear"
          children={() => (  
            <PrizeDraw navigateTo={handleSetNavigate} handleAlterItem={handleAlterItem}/>
          )}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Octicons 
                  name="gift" 
                  size={24} 
                  color={focused ? '#FFF' : '#464646'} 
                />
              );
            },
            unmountOnBlur: true,
          }}
        />

        <Screen
          name="Discover"
          children={() => (
            <CommingSoon />
          )}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <MaterialCommunityIcons 
                  name="compass-outline" 
                  size={25} 
                  color={focused ? '#FFF' : '#464646'} 
                />
              );
            },
            unmountOnBlur: true,
          }}
        />

        <Screen
          name="Configs"
          children={() => (
            <Configs />
          )}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <MaterialIcons 
                  name="settings" 
                  size={24} 
                  color={focused ? '#fff' : '#464646'} 
                />
              );
            },
            unmountOnBlur: true,
          }}
        />

        <Screen
          name="Search"
          children={() => (
            <Search 
              openModalAddMovie={openModalAddMovie} 
              handleSelectedMovieToAdd={handleSelectedMovieToAdd} 
              columnId={handleColumnId}
            />
          )}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Feather 
                  name="search" 
                  size={24} 
                  color={focused ? '#FFF' : '#464646'}
                />
              );
            },
            tabBarButton: props => null, 
            unmountOnBlur: true,
          }}
        />
      </Navigator>

      <Modalize 
        snapPoint={(windowHeight/100) * 80} 
        modalHeight={(windowHeight/100) * 80}
        modalStyle={{ backgroundColor: '#000014' }}
        ref={movieRef}
        >
          <MovieDetail handleCloseMovie={handleCloseMovie} movie={selectedMovie} />
      </Modalize>

      <Modalize 
        snapPoint={(windowHeight/100) * 75} 
        modalHeight={(windowHeight/100) * 75}
        modalStyle={{ backgroundColor: '#000014' }}
        ref={columnRef}
        keyboardAvoidingBehavior="height"
        onClose={() => {
          setTimeout(() => {
            setSelectedColumn({})
          }, 250)
        }}
        >
          <ColumnDetail column={selectedColumn} handleCloseColumn={handleCloseColumn}/>
      </Modalize>

      <Modalize 
        snapPoint={450} 
        modalHeight={450}
        modalStyle={{ backgroundColor: '#000014' }}
        ref={movieToAddRef}
        onClose={() => {
          setTimeout(() => {
            setSelectedMovieToAdd({})
          }, 1000)
        }}
        >
          <AddMovieModal navigateTo={handleSetNavigate} columnid={columnId} movie={selectedMovieToAdd} handleCloseModalAdd={handleCloseModalAdd}/>
      </Modalize>
    </>
  );
}

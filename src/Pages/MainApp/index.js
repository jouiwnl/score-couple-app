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
import GenericProvider from '../../contexts/generic';
import NavigationProvider from '../../contexts/navigation';
import { AuthContext } from '../../contexts/auth';

const { Navigator, Screen } = createBottomTabNavigator();

export default function() {
  const { user, getUser } = React.useContext(AuthContext);
  const windowHeight = Dimensions.get('window').height;

  const movieRef = React.useRef(null);
  const columnRef = React.useRef(null);
  const movieToAddRef = React.useRef(null);

  const [columnId, setColumnId] = React.useState(null);

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
  function handleColumnId(id) {
    setColumnId(id)
  }

  //CLOSES
  function handleCloseMovie(item) {
    movieRef.current?.close();
    if (item) getUser(user.email, true);
  }

  function handleCloseColumn(item) {
    columnRef.current?.close();
    if (item) getUser(user.email, true);
  }

  function handleCloseModalAdd(item) {
    movieToAddRef.current?.close();
    if (item) getUser(user.email, true);
  }

  return (
    <NavigationProvider>
      <GenericProvider>
        <Navigator
          initialRouteName='WorkSpace'
          swipe
          tabBarOptions={{
            style: {
              height: Platform.OS === 'android' ? 70 : 90,
              backgroundColor: '#000014',
              borderTopColor: '#464646',
              borderTopWidth: 1
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
                openModalMovie={openModalMovie} 
                openModalColumn={openModalColumn}
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
            component={PrizeDraw}
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
            component={CommingSoon}
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
            component={Configs}
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
            <MovieDetail handleCloseMovie={handleCloseMovie} />
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
            <ColumnDetail handleCloseColumn={handleCloseColumn}/>
        </Modalize>

        <Modalize 
          snapPoint={450} 
          modalHeight={450}
          modalStyle={{ backgroundColor: '#000014' }}
          ref={movieToAddRef}
          >
            <AddMovieModal columnid={columnId} handleCloseModalAdd={handleCloseModalAdd}/>
        </Modalize>
      </GenericProvider>
    </NavigationProvider>
  );
}

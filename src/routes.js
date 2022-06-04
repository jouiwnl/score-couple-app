import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import Home from './Pages/Home'
import Search from './Pages/Search'

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        tabBarOptions={{
          style: {
            height: 60,
            backgroundColor: '#000014',
            borderTopWidth: 0,
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
            fontFamily: 'sans-serif',
            fontSize: 11,
            marginTop: 5,
          },
          inactiveTintColor: '#464646',
          activeTintColor: '#FFF',
        }}
      >
        <Screen
          name="Workspace"
          component={Home}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <MaterialIcons 
                  name="workspaces-filled" 
                  size={size} 
                  color={focused ? '#FFF' : '#464646'}
                />
              );
            },
          }}
        />

        <Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ size, focused }) => {
              return (
                <Feather 
                  name="search" 
                  size={size} 
                  color={focused ? '#FFF' : '#464646'}
                />
              );
            },
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

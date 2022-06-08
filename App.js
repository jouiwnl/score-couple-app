import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

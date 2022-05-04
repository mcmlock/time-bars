import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from './resources/storageFunctions';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [timeBars, setTimeBars] = useState([]);

  useEffect(() => {
    getData(setTimeBars);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Create'
          options={{ headerShown: false }}
        >
          {props => <CreateScreen {...props} timeBars={timeBars} setTimeBars={setTimeBars} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getData } from './resources/storageFunctions';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import ViewScreen from './screens/ViewScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [timeBars, setTimeBars] = useState([]);
  const [selectedTimeBar, setSelectedTimeBar] = useState();

  useEffect(() => {
    getData(setTimeBars);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          options={{ headerShown: false }}
        >
          {props =>
            <HomeScreen
              {...props}
              timeBarsProps={timeBars}
              selectTimeBar={setSelectedTimeBar}
            />}
        </Stack.Screen>
        <Stack.Screen
          name='Create'
          options={{ headerShown: false }}
        >
          {props =>
            <CreateScreen
              {...props}
              timeBars={timeBars}
              setTimeBars={setTimeBars}
            />}
        </Stack.Screen>
        <Stack.Screen
          name='View'
          options={{ headerShown: false }}
        >
          {props =>
            <ViewScreen
              {...props}
              timeBar={selectedTimeBar}
            />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
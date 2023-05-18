import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEventScreen from './app/screens/CreateEventScreen';
import DetailScreen from './app/screens/DetailScreen';
import EventScreen from './app/screens/EventScreen';
import HomeScreen from './app/screens/HomeScreen';
import SplashScreen from './app/screens/SplashScreen';
import TodayScreen from './app/screens/TodayScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Today" component={TodayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Event" component={EventScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import PlayersRegister  from './src/screens/playersRegister';
import UserRegister from './src/screens/userRegister';
import ListPlayers from './src/screens/listPlayers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="ListPlayers"
          component={ListPlayers}
        /> 
        <Stack.Screen
          name="Login"
          component={Login}
        />    
        <Stack.Screen
          name="PlayersRegister"
          component={PlayersRegister}
        />
        <Stack.Screen
          name="UserRegister"
          component={UserRegister}
        />

        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
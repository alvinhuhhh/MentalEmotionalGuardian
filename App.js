import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
} from 'react-native';
import LoadingScreen from './app/screens/LoadingScreen';
import MenuPage from './app/screens/MenuPage';
import Megan from './app/screens/Megan';
import SMM from './app/screens/SMM';
import Wearable from './app/screens/Wearable';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Loading Screen'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1c1c1e',
        },
        headerTintColor: '#edf6f9',
      }}>
        <Stack.Screen
        name='Loading Screen'
        component={LoadingScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name='Menu Page'
        component={MenuPage}
        options={{
          headerTitle: 'Hello',
          headerLeft: null,
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: '#1c1c1e'
          },
          headerTintColor: '#edf6f9',
        }}
        />
        <Stack.Screen
        name='Megan'
        component={Megan}
        options={{}}
        />
        <Stack.Screen
        name='Social Media Monitor'
        component={SMM}
        options={{}}
        />
        <Stack.Screen
        name='Wearable'
        component={Wearable}
        options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

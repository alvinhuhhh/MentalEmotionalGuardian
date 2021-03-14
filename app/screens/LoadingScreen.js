import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const APIUrl = 'https://meg-backend-46.herokuapp.com/Megan/';

function LoadingScreen({ navigation }) {
  fetch(APIUrl, {
    method: 'GET'
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    console.log(jsonResponse);
    navigation.navigate('Menu Page');
  });

  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212'
  },
  bg: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E29578',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  }
});

export default LoadingScreen;
import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { NavigationContainer, useIsFocused, useNavigationState } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';

function MenuPage({ navigation }) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainArea}>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Megan')}
        >
          <Image style={styles.image} source={require('../assets/GraphicMegan.png')}/>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Social Media Monitor')}
        >
          <Image style={styles.image} source={require('../assets/GraphicSMM.png')}/>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.touchable}
        onPress={() => navigation.navigate('Wearable')}
        >
          <Image style={styles.image} source={require('../assets/GraphicWearable.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    fontSize: 14,
    color: '#fff'
  },
  image: {
    height: 150,
    width: 340
  },
  touchable: {
    padding: 8
  },
  mainArea: {
    flex: 111,
    padding: 8,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
});

export default MenuPage;
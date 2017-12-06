import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';

import HomeScreen from './Screens/HomeScreen';
import DetailScreen from './Screens/DetailScreen';

const App = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: DetailScreen },
  });

export default App;

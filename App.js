import React from 'react';
import { View } from 'react-native';
import { KeepAwake } from 'expo';

import Game from './Game';

import styles from './styles';

const App = () => (
  <View style={styles.container}>
    <KeepAwake />
    <Game />
  </View>
);

export default App;

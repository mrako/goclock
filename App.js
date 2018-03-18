import React from 'react';
import { View } from 'react-native';

import Game from './Game';

import styles from './styles';

const App = () => (
  <View style={styles.container}>
    <Game />
  </View>
);

export default App;

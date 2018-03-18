import React, { Component } from 'react';
import { View } from 'react-native';

import Half from './components/Half';

import styles from './styles';

class Game extends Component {
  state = { runningSide: null }

  render() {
    const { runningSide } = this.state;

    return (
      <View style={styles.container}>
        <Half side="guest" runningSide={runningSide} handlePress={() => this.setState({ runningSide: 'home' })} />
        <Half side="home" runningSide={runningSide} handlePress={() => this.setState({ runningSide: 'guest' })} />
      </View>
    );
  }
}

export default Game;

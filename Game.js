import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Player from './Player';

import Half from './components/Half';

import styles from './styles';

class Game extends Component {
  state = { runningSide: null }

  componentWillMount() {
    const homePlayer = new Player(5, 1, 3);
    const guestPlayer = new Player(5, 1, 3);

    this.setState({ homePlayer, guestPlayer });
  }

  handlePress = (side) => {
    const { homePlayer, guestPlayer } = this.state;

    if (side === 'home') {
      homePlayer.stop();
      guestPlayer.start();
      this.setState({ runningSide: 'guest' });
    } else {
      homePlayer.start();
      guestPlayer.stop();
      this.setState({ runningSide: 'home' });
    }
  }

  render() {
    const { runningSide, homePlayer, guestPlayer } = this.state;

    return (
      <View style={styles.container}>
        <Half side="guest" player={guestPlayer} runningSide={runningSide} handlePress={() => this.handlePress('guest')} />
        <Half side="home" player={homePlayer} runningSide={runningSide} handlePress={() => this.handlePress('home')} />
      </View>
    );
  }
}

export default Game;

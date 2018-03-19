import React, { Component } from 'react';
import { View } from 'react-native';

import Player from './Player';

import Button from './components/Button';
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

  handlePause = () => {
    const { homePlayer, guestPlayer } = this.state;

    homePlayer.stop();
    guestPlayer.stop();
    this.setState({ runningSide: null });
  }

  render() {
    const { runningSide, homePlayer, guestPlayer } = this.state;

    return (
      <View style={styles.container}>
        <Half side="guest" player={guestPlayer} runningSide={runningSide} handlePress={() => this.handlePress('guest')} />
        <Half side="home" player={homePlayer} runningSide={runningSide} handlePress={() => this.handlePress('home')} />
        <Button handlePause={this.handlePause}/>
      </View>
    );
  }
}

export default Game;

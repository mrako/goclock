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

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePress = (side) => {
    const { runningSide, homePlayer, guestPlayer } = this.state;

    if (homePlayer.outOfTime() || guestPlayer.outOfTime()) {
      return;
    }

    if (runningSide && side !== runningSide) {
      return;
    }

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

  buttonState = () => {
    const { runningSide, homePlayer, guestPlayer } = this.state;

    if (homePlayer.outOfTime() || guestPlayer.outOfTime()) {
      return 'reload';
    }

    if (!runningSide) {
      return 'settings';
    }

    return 'pause';
  }

  handleButton = () => {
    const { homePlayer, guestPlayer } = this.state;

    if (this.buttonState() === 'reload') {
      const newHome = new Player(5, 1, 3);
      const newGuest = new Player(5, 1, 3);

      this.setState({ runningSide: null, homePlayer: newHome, guestPlayer: newGuest });
    } else if (this.buttonState() === 'pause') {
      homePlayer.stop();
      guestPlayer.stop();
      this.setState({ runningSide: null });
    }
  }

  render() {
    const { runningSide, homePlayer, guestPlayer } = this.state;

    return (
      <View style={styles.container}>
        <Half side="guest" player={guestPlayer} runningSide={runningSide} handlePress={() => this.handlePress('guest')} />
        <Half side="home" player={homePlayer} runningSide={runningSide} handlePress={() => this.handlePress('home')} />
        <Button state={this.buttonState()} handleButton={this.handleButton} />
      </View>
    );
  }
}

export default Game;

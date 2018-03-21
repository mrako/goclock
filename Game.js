import React, { Component } from 'react';
import { View } from 'react-native';

import { Audio } from 'expo';

import Player from './Player';

import Button from './components/Button';
import Half from './components/Half';

import styles from './styles';

const blinkHome = new Audio.Sound();
const blinkGuest = new Audio.Sound();

blinkHome.loadAsync(require('./assets/sounds/digi_plink_on.wav'));
blinkGuest.loadAsync(require('./assets/sounds/digi_plink_off.wav'));

class Game extends Component {
  state = { runningSide: null }

  componentWillMount() {
    const homePlayer = new Player(1, 0.5, 3);
    const guestPlayer = new Player(1, 0.5, 3);

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

      try {
        blinkHome.playAsync();
      } catch (error) {}
    } else {
      homePlayer.start();
      guestPlayer.stop();
      this.setState({ runningSide: 'home' });

      try {
        blinkGuest.playAsync();
      } catch (error) {}
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

    homePlayer.playSoundIfNeeded();
    guestPlayer.playSoundIfNeeded();

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

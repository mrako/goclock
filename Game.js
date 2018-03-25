import React, { Component } from 'react';
import { View } from 'react-native';

import { Audio } from 'expo';

import Player from './Player';

import Button from './components/Button';
import Half from './components/Half';
import Settings from './components/Settings';

import styles from './styles';

const blinkHome = new Audio.Sound();
const blinkGuest = new Audio.Sound();

blinkHome.loadAsync(require('./assets/sounds/digi_plink_on.wav'));
blinkGuest.loadAsync(require('./assets/sounds/digi_plink_off.wav'));

class Game extends Component {
  state = { gameStarted: false, runningSide: null, showSettings: false }

  componentWillMount() {
    const homePlayer = new Player(3, 30, 3);
    const guestPlayer = new Player(3, 30, 3);

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

    this.setState({ gameStarted: true });

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
    const { runningSide, gameStarted, homePlayer, guestPlayer } = this.state;

    if (!gameStarted) {
      return 'settings';
    }

    if (runningSide && !homePlayer.outOfTime() && !guestPlayer.outOfTime()) {
      return 'pause';
    }

    return 'reload';
  }

  handleButton = () => {
    const { homePlayer, guestPlayer } = this.state;

    if (this.buttonState() === 'reload') {
      const newHome = new Player(3, 0.5, 3);
      const newGuest = new Player(3, 0.5, 3);

      this.setState({ gameStarted: false, runningSide: null, homePlayer: newHome, guestPlayer: newGuest });

      return;
    }

    if (this.buttonState() === 'pause') {
      homePlayer.stop();
      guestPlayer.stop();

      this.setState({ runningSide: null });

      return;
    }

    this.setState({ showSettings: true });
  }

  updateSettings = (settings) => {
    let newGuest;

    const newHome = new Player(settings.homeMainTime, settings.homeByoyomi, settings.homePeriods);

    if (settings.sameGuest) {
      newGuest = new Player(settings.homeMainTime, settings.homeByoyomi, settings.homePeriods);
    } else {
      newGuest = new Player(settings.guestMainTime, settings.guestByoyomi, settings.guestPeriods);
    }

    this.setState({ gameStarted: false, runningSide: null, homePlayer: newHome, guestPlayer: newGuest });

    this.setState({ showSettings: false });
  }

  render() {
    const { runningSide, homePlayer, guestPlayer, showSettings } = this.state;

    homePlayer.playSoundIfNeeded();
    guestPlayer.playSoundIfNeeded();

    return (
      <View style={styles.container}>
        <Half side="guest" player={guestPlayer} runningSide={runningSide} handlePress={() => this.handlePress('guest')} />
        <Half side="home" player={homePlayer} runningSide={runningSide} handlePress={() => this.handlePress('home')} />
        <Button state={this.buttonState()} handleButton={this.handleButton} />
        <Settings modalVisible={showSettings} updateSettings={this.updateSettings} />
      </View>
    );
  }
}

export default Game;

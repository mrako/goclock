import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

class Half extends Component {
  state = { lastPlayed: null };

  rotatedText = () => {
    const { side } = this.props;

    return side === 'guest' ? styles.rotatedText : {};
  }

  byoyomiStyle = () => {
    const { side } = this.props;

    return [styles.byoyomi, (side === 'guest' ? styles.byoyomiRotated : styles.byoyomiStraight)];
  }

  viewState = () => {
    const { player, side, runningSide } = this.props;

    if (player.outOfTime()) {
      return 'lost';
    }

    if (!runningSide) {
      return 'paused';
    }

    if (side === runningSide) {
      return 'active';
    }

    return 'inactive';
  }

  byoyomiPeriodsLeft = () => {
    const { player } = this.props;

    return `${'\u25CB'.repeat(player.periods - player.periodsRemaining)}${'\u25CF'.repeat(player.periodsRemaining)}`;
  }

  render() {
    const { player, handlePress } = this.props;

    return (
      <TouchableOpacity style={[styles.container, styles[`${this.viewState()}View`]]} onPress={handlePress}>
        <View style={styles.view}>
          <Text style={[styles.text, this.rotatedText(), styles[`${this.viewState()}Text`]]}>{player.currentTimeString()}</Text>
          <Text style={[this.byoyomiStyle(), styles[`${this.viewState()}Text`]]}>{this.byoyomiPeriodsLeft()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Half;

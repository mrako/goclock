import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

class Half extends Component {
  state = { time: null }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  rotatedText = () => {
    const { side } = this.props;

    return side === 'guest' ? styles.rotatedText : {};
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

  render() {
    const { player, handlePress } = this.props;

    return (
      <TouchableOpacity style={[styles.container, styles[`${this.viewState()}View`]]} onPress={handlePress}>
        <View>
          <Text style={[styles.text, this.rotatedText(), styles[`${this.viewState()}Text`]]}>{player.currentTime()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Half;

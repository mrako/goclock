import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

class Half extends Component {
  rotatedText = () => {
    const { side } = this.props;

    if (side === 'guest') {
      return styles.rotatedText;
    }
  }

  viewState = () => {
    const { side, runningSide } = this.props;

    if (!runningSide) {
      return 'paused';
    }

    if (side === runningSide) {
      return 'active';
    }

    return 'inactive';
  }

  render() {
    const { handlePress } = this.props;

    return (
      <TouchableOpacity style={[styles.container, styles[`${this.viewState()}View`]]} onPress={handlePress}>
        <View>
          <Text style={[styles.text, this.rotatedText(), styles[`${this.viewState()}Text`]]}>1:00</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Half;

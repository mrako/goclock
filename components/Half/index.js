import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

class Half extends Component {
  viewStyle = () => {
    const { side, runningSide } = this.props;

    if (!runningSide) {
      return styles.paused;
    }

    if (side === runningSide) {
      return styles.active;
    }

    return styles.inactive;
  }

  textStyle = () => {
    const { side, runningSide } = this.props;

    if (!runningSide) {
      return styles.pausedText;
    }

    if (side === runningSide) {
      return styles.activeText;
    }

    return styles.inactiveText;
  }

  rotatedText = () => {
    const { side } = this.props;

    if (side === 'guest') {
      return styles.rotatedText;
    }
  }

  render() {
    const { handlePress } = this.props;

    return (
      <TouchableOpacity style={[styles.container, this.viewStyle()]} onPress={handlePress}>
        <View>
          <Text style={[styles.text, this.rotatedText(), this.textStyle()]}>1:00</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Half;

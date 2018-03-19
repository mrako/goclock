import React, { Component } from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';

import styles from './styles';

class Button extends Component {
  render() {
    const { handlePause } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.circle} onPress={handlePause}>
          <Image style={styles.image} source={require('./images/pause.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Button;

import React, { Component } from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';

import styles from './styles';

class Button extends Component {
  render() {
    const { type, handleButton } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.circle} onPress={handleButton}>
          <Image style={styles.image} source={require(`./images/${type}.png`)} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default Button;

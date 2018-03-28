import React from 'react';
import { TouchableHighlight, View, Image } from 'react-native';

import styles from './styles';

const images = {
  pause: require('./images/pause.png'),
  reload: require('./images/reload.png'),
  settings: require('./images/settings.png'),
};

const Button = (props) => {
  const { state, handleButton } = props;

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.circle} onPress={handleButton}>
        <Image style={styles.image} source={images[state]} />
      </TouchableHighlight>
    </View>
  );
};

export default Button;

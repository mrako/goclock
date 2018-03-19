import { Dimensions, StyleSheet, PixelRatio } from 'react-native';

const size = 80;

const verticalCenter = (Dimensions.get('window').height - size) / 2;
const horizontalCenter = (Dimensions.get('window').width - size) / 2;

const borderRadius = size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    top: verticalCenter,
    left: horizontalCenter,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius,
    height: size,
    width: size,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#000000',
  },
  image: {
    height: 30,
    width: 30,
  },
});

export default styles;

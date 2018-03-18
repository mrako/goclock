import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 2,
    borderWidth: 2,
    borderColor: '#000000',
  },
  text: {
    fontSize: 90,
    fontFamily: 'Menlo-Bold',
  },
  rotatedText: {
    transform: [{ rotate: '180deg' }],
  },
  pausedView: {
    backgroundColor: '#cccccc',
  },
  pausedText: {
    color: '#000000',
  },
  activeView: {
    backgroundColor: '#91C4C5',
  },
  activeText: {
    color: '#000000',
  },
  inactiveView: {
    backgroundColor: '#000000',
  },
  inactiveText: {
    color: '#ffffff',
  },
});

export default styles;

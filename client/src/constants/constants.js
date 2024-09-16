import {StyleSheet} from 'react-native';

//Import token images
import redToken from '../assets/tokens/red.png';
import blueToken from '../assets/tokens/blue.png';
import yellowToken from '../assets/tokens/yellow.png';
import greenToken from '../assets/tokens/green.png';

// Import dice images
import dice1 from '../assets/dice/dice1.png';
import dice2 from '../assets/dice/dice2.png';
import dice3 from '../assets/dice/dice3.png';
import dice4 from '../assets/dice/dice4.png';
import dice5 from '../assets/dice/dice5.png';
import dice6 from '../assets/dice/dice6.png';

export const IMAGES = {
  red: redToken,
  blue: blueToken,
  yellow: yellowToken,
  green: greenToken,
  dice1,
  dice2,
  dice3,
  dice4,
  dice5,
  dice6,
};

export const STYLES = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  imageContainer: {
    borderColor: 'aqua',
    borderWidth: 4,
    borderRadius: 10,
    borderStyle: 'solid',
  },
  image: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  verticalDiceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'inherit',
  },
  horizontalDiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledDice: {
    opacity: 0.5,
  },
});

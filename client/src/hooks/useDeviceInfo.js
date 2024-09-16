import {useState, useEffect} from 'react';
import {Platform, Dimensions} from 'react-native';

const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    serverUrl: '',
    platform: Platform.OS,
  });

  const isWeb = deviceInfo.platform === 'web';
  const {width, height} = Dimensions.get('window');
  const dimension = isWeb ? height : width;

  const paddingHorizontal = dimension * 0.05;
  const boxSize = dimension * 0.95;
  const cellSize = boxSize / 15;

  useEffect(() => {
    const determineServerUrl = async () => {
      let serverUrl = '';

      if (Platform.OS === 'android') {
        serverUrl = `http://192.168.1.5:5000`;
      } else if (Platform.OS === 'web') {
        serverUrl = `http://localhost:5000`;
      }

      setDeviceInfo({
        serverUrl,
        platform: Platform.OS,
      });
    };

    determineServerUrl();
  }, []);

  return {deviceInfo, paddingHorizontal, boxSize, cellSize};
};

export default useDeviceInfo;

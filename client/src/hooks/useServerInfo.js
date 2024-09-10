import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

const useServerInfo = () => {
  const [serverInfo, setServerInfo] = useState({
    serverUrl: '',
    platform: Platform.OS,
  });

  useEffect(() => {
    const determineServerUrl = async () => {
      let serverUrl = '';

      if (Platform.OS === 'android') {
        serverUrl = `http://192.168.1.5:5000`;
      } else if (Platform.OS === 'web') {
        serverUrl = `http://localhost:5000`;
      }

      setServerInfo({
        serverUrl,
        platform: Platform.OS,
      });
    };

    determineServerUrl();
  }, []);

  return serverInfo;
};

export default useServerInfo;

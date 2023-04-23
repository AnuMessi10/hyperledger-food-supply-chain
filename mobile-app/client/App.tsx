/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC, useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Navigation/AuthStack';
import AxiosUtils from './src/Utilities/axiosUtils';
import Config from 'react-native-config';

const App: FC = () => {
  useEffect(() => {
    AxiosUtils.setBaseAPI_URL(Config.BASE_URL ?? '');
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC} from 'react';
import Login from './src/Screens/Login';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTP from './src/Screens/Login/OTP';
import Register from './src/Screens/Registration';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

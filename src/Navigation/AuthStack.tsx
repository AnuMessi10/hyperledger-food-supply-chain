/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import Login from '../Screens/Auth/Login';
import OTP from '../Screens/Auth/OTP';
import Register from '../Screens/Auth/Registration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './AuthContext';
import Landing from '../Screens/App/Landing';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [mobile, setMobile] = useState({});
  const value = {mobile, setMobile};
  return (
    <AuthContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AuthStack;

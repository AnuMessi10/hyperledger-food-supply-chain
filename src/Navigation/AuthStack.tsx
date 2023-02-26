import React, {useState} from 'react';
import Login from '../Screens/Login';
import OTP from '../Screens/OTP';
import Registration from '../Screens/Registration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './AuthContext';
import Landing from '../Screens/Landing';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [mobile, setMobile] = useState(-1);
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
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AuthStack;

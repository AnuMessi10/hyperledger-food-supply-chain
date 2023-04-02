import React, {useState} from 'react';
import Login from '../Screens/Login';
import OTP from '../Screens/OTP';
import Registration from '../Screens/Registration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './AuthContext';
import Landing from '../Screens/Landing';
import CreateProduct from '../Screens/CreateProduct/index';
import QueryProduct from '../Screens/QueryProduct/index';
import ProductDetails from '../Screens/ProductDetails/index';
import ShipProduct from '../Screens/ShipProduct/index';
import ProductionLocation from '../Screens/Location/index';
import TestingProduct  from "../Screens/testHere/testing";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [mobile, setMobile] = useState(-1);
  const value = {mobile, setMobile};
  return (
    <AuthContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="OTP" component={OTP} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Registration} options={{headerShown: false}}/>
        <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>

        {/* Product */}
        <Stack.Screen name="CreateProduct" component={CreateProduct} options={{headerShown: false}}/>
        <Stack.Screen name="QueryProduct" component={QueryProduct} options={{headerShown: false}}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{headerShown: false}}/>
        <Stack.Screen name="ShipProduct" component={ShipProduct} />
        <Stack.Screen name="ProductionLocation" component={ProductionLocation} />

        <Stack.Screen name="TestingProduct" component={TestingProduct} />

      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AuthStack;

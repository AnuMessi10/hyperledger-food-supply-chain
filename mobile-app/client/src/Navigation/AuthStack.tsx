import React, {useState} from 'react';
import Login from '../Screens/Login';
import OTP from '../Screens/OTP';
import Registration from '../Screens/Registration';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from './AuthContext';
import Landing from '../Screens/Landing';
import CreateProduct from '../Screens/Product/Create';
import QueryProduct from '../Screens/Product/Query/index';
import ProductDetails from '../Screens/Product/Details/index';
import ShipProduct from '../Screens/Product/Ship/index';
import ProductLocation from '../Screens/Product/Location/index';
// import  TestingProduct  from "../Screens/testHere/testing";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [mobile, setMobile] = useState(-1);
  const value = {mobile, setMobile};
  return (
    <AuthContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Register" component={Registration} />
        <Stack.Screen name="Landing" component={Landing} />

        {/* Product */}
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="QueryProduct" component={QueryProduct} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="ShipProduct" component={ShipProduct} />
        <Stack.Screen name="ProductLocation" component={ProductLocation} />

        {/* <Stack.Screen name="TestingProduct" component={TestingProduct} /> */}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default AuthStack;

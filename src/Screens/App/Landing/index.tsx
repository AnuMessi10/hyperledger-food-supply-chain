/* eslint-disable prettier/prettier */
import { Text } from 'native-base';
import React, {FC} from 'react';
import {View} from 'react-native';

export interface ILandingProps {}

const Landing: FC<ILandingProps> = () => {
  return (
    <View>
      <Text>Welcome to the app!</Text>
    </View>
  );
};

export default Landing;

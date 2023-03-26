import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Button, Text} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

export interface ILandingProps {
  navigation: NativeStackNavigationHelpers;
}

const Landing: FC<ILandingProps> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text variant="2xl">Welcome to the app!</Text>
      <Button
        marginTop={10}
        width="3xs"
        onPress={() => navigation.navigate('CreateProduct')}>
        Add/Create a Product
      </Button>
      <Button marginTop={10} width="3xs">
        View your product
      </Button>
    </View>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height - 200,
  },
});

export default Landing;

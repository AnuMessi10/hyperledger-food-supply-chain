import React, {FC} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

export interface ILandingProps {
  navigation: NativeStackNavigationHelpers;
}

const Landing: FC<ILandingProps> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome to FoodNet!</Text>
      <Text style={styles.subtitle}>
        A platform to connect consumers, producers, and retailers.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateProduct')}>
        <Text style={styles.buttonText}>Add/Create a Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AllProducts')}>
        <Text style={styles.buttonText}>View all products</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#0086B3',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Landing;

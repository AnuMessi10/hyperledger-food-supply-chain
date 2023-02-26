/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'native-base';
import React, {FC, useState, useContext} from 'react';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

import AuthContext from '../../../Navigation/AuthContext';
export interface IRegistrationProps {
  navigation: NativeStackNavigationHelpers;
}

const Register: FC<IRegistrationProps> = ({navigation}) => {
  const [formFields, setFormFields] = useState<{
    name?: string;
    mobile?: number;
    password?: string;
  }>({});

  const {setMobile} = useContext(AuthContext);

  const handleRegistration = () => {
    formFields.mobile && setMobile(formFields.mobile);
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
    navigation.navigate('OTP');
  };

  const handleInputChange = (
    fieldName: 'mobile' | 'name' | 'password',
    value: string,
  ) => {
    setFormFields({
      ...formFields,
      [fieldName]: fieldName === 'mobile' ? Number(value) : value,
    });
  };
  return (
    <View>
      <View>
        <View>
          <Input
            type="text"
            placeholder="Enter your name"
            onChangeText={e => handleInputChange('name', e)}
          />
        </View>
        <View style={styles.input}>
          <Input
            type="text"
            placeholder="Enter your mobile number"
            onChangeText={e => handleInputChange('mobile', e)}
          />
        </View>
        <View style={styles.input}>
          <Input
            type="password"
            placeholder="Create a password"
            onChangeText={e => handleInputChange('password', e)}
          />
        </View>
        <View style={styles.input}>
          <Input type="password" placeholder="Confirm entered password" />
        </View>
      </View>
      <View>
        <Button onPress={() => handleRegistration()}>Register</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    margin: 5,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Register;

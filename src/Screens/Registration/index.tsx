import {StyleSheet, View} from 'react-native';
import {
  Button,
  Input,
  Box,
  FormControl,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, {FC, useContext} from 'react';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

import AuthContext from '../../Navigation/AuthContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {REQUIRED_FIELD_MESSAGE} from '../../Constants';

export interface IRegistrationProps {
  navigation: NativeStackNavigationHelpers;
}

const {object, string} = Yup;

const registrationSchema = object({
  name: string().required(REQUIRED_FIELD_MESSAGE),
  mobile: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .length(10, 'Mobile Number must be equal to 10 digits'),
  password: string().required(REQUIRED_FIELD_MESSAGE),
  confirmPassword: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(/^[a-z]/, 'Entered Passwords do not match'),
});

const Registration: FC<IRegistrationProps> = ({navigation}) => {
  const {setMobile} = useContext(AuthContext);

  const handleRegistration = (e: {
    name: string;
    mobile: number;
    password: string;
    confirmPassword: string;
  }) => {
    console.log(e);
    setMobile(e.mobile);
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
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

  return (
    <View style={{paddingHorizontal: 20}}>
      <Formik
        validationSchema={registrationSchema}
        initialValues={{
          name: '',
          mobile: 0,
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => handleRegistration(values)}>
        {({values, errors, handleSubmit, handleChange, touched}) => {
          return (
            <Box>
              <Box>
                <Text bold fontSize="xl" mb="4">
                  Create your account now
                </Text>
                <FormControl mb="2" isInvalid={touched.name && !!errors.name}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  mb="2"
                  isInvalid={touched.mobile && !!errors.mobile}>
                  <FormControl.Label>mobile</FormControl.Label>
                  <Input
                    placeholder="Your mobile number"
                    type="text"
                    value={`${values.mobile}`}
                    onChangeText={handleChange('mobile')}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.mobile}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  mb="2"
                  isInvalid={touched.password && !!errors.password}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl
                  mb="2"
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input
                    placeholder="Enter your password again"
                    type="password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.confirmPassword}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <Button onPress={handleSubmit}>Create your account now</Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
      {/* <Formik
        initialValues={{
          name: '',
          mobile: 0,
          password: '',
        }}
        onSubmit={values => console.log(values)}>
        {({values, errors, handleSubmit, handleChange}) => {
          return (
            <>
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
                  <Input
                    type="password"
                    placeholder="Confirm entered password"
                  />
                </View>
              </View>
              <View>
                <Button onPress={() => handleRegistration()}>Register</Button>
              </View>
            </>
          );
        }}
      </Formik> */}
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

export default Registration;

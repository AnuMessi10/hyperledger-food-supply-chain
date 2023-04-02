import {StyleSheet, View} from 'react-native';
import {
  Button,
  Input,
  Box,
  FormControl,
  Text,
  WarningOutlineIcon,
  Heading,
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
    <Box bgColor={'cyan.100'}>
      <View  style={styles.main}>
      <Box borderWidth={2}  borderColor={'blue.300'} borderRadius={'lg'} style={styles.box}>
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
              <Box >
                <Heading color={'blue.700'} textAlign={'center'} variant="h3" mb="4" >Create your account now</Heading>
                <FormControl width={'72'} mb="2" isInvalid={touched.name && !!errors.name}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input borderRadius={'lg'} borderColor={'blue.500'}
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
                  <FormControl.Label>Mobile</FormControl.Label>
                  <Input borderRadius={'lg'} borderColor={'blue.500'}
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
                  <Input borderRadius={'lg'} borderColor={'blue.500'}
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
                  mb="10"
                  isInvalid={
                    touched.confirmPassword && !!errors.confirmPassword
                  }>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input borderRadius={'lg'} borderColor={'blue.500'}
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
                <Button 
                variant="outline"
                borderRadius="full"
                borderColor={'blue.500'}
                colorScheme={'blue'} mb="4"  
                onPress={handleSubmit}>Create your account now</Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
      </Box>
    </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  main:{
    height:"110%",
    display:"flex",
    alignItems:"center",
    alignContent:'center',   
  },
  box: {
    paddingHorizontal: 40,
    paddingVertical: 50,
    display: 'flex',
    marginVertical:"30%",
    marginHorizontal:"1%"
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

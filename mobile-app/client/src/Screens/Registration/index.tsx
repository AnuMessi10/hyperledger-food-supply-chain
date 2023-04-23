import {View} from 'react-native';
import {
  Button,
  Input,
  Box,
  FormControl,
  Text,
  WarningOutlineIcon,
  Select,
  CheckIcon,
} from 'native-base';
import React, {FC, useContext} from 'react';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

import AuthContext from '../../Navigation/AuthContext';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {REQUIRED_FIELD_MESSAGE} from '../../Constants';
import AuthModel from '../../Models/Auth';
import {Actor} from '../../Models/Food/@types';

export interface IRegistrationProps {
  navigation: NativeStackNavigationHelpers;
}

const {object, string, ref} = Yup;

const registrationSchema = object({
  name: string().required(REQUIRED_FIELD_MESSAGE),
  mobile: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .length(10, 'Mobile Number must be equal to 10 digits'),
  password: string().required(REQUIRED_FIELD_MESSAGE),
  confirmPassword: string()
    .required(REQUIRED_FIELD_MESSAGE)
    .oneOf([ref('password')], 'Passwords must match'),
  actor: string().required('You need to select a role!'),
});

const Registration: FC<IRegistrationProps> = ({navigation}) => {
  const {setMobile} = useContext(AuthContext);

  const handleRegistration = async (e: {
    name: string;
    mobile: number;
    password: string;
    confirmPassword: string;
    actor: Actor;
  }) => {
    // console.log(e.actor);
    setMobile(e.mobile);
    await AuthModel.register(e);
    navigation.navigate('OTP');
  };

  return (
    <View>
      <Box px={5}>
        <Formik
          validationSchema={registrationSchema}
          initialValues={{
            name: '',
            mobile: '' as unknown as number,
            password: '',
            confirmPassword: '',
            actor: 'CONSUMER' as Actor,
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
                    <FormControl.Label>Mobile</FormControl.Label>
                    <Input
                      placeholder="Your mobile number"
                      type="text"
                      value={`${values.mobile}`}
                      onChangeText={handleChange('mobile')}
                      keyboardType="numeric"
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
                  <FormControl
                    mb="2"
                    isInvalid={touched.actor && !!errors.actor}>
                    <FormControl.Label>Choose Role</FormControl.Label>
                    <Select
                      minWidth="200"
                      accessibilityLabel="Choose your role"
                      placeholder="Consumer"
                      _selectedItem={{
                        endIcon: <CheckIcon size={5} />,
                      }}
                      selectedValue={values.actor}
                      onValueChange={handleChange('actor')}>
                      <Select.Item label="Consumer" value="CONSUMER" />
                      <Select.Item label="Retailer" value="RETAILER" />
                      <Select.Item label="Wholesaler" value="WHOLESALER" />
                      <Select.Item label="Distributor" value="DISTRIBUTOR" />
                      <Select.Item label="Manufacturer" value="MANUFACTURER" />
                      <Select.Item label="Producer" value="PRODUCER" />
                    </Select>
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}>
                      {errors.actor}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box mt="5">
                  <Button onPress={handleSubmit}>
                    Create your account now
                  </Button>
                </Box>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </View>
  );
};

export default Registration;

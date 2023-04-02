import {View} from 'react-native';
import React, {FC} from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {REQUIRED_FIELD_MESSAGE} from '../../../Constants';

export interface QueryProductProps {
  navigation: NativeStackNavigationHelpers;
}

const {object, string, number} = Yup;

const QueryProductSchema = object({
  name: string().required(REQUIRED_FIELD_MESSAGE),
  quantity: string().required(REQUIRED_FIELD_MESSAGE),
  price: number()
    .required(REQUIRED_FIELD_MESSAGE)
    .positive('Please enter a valid price!'),
});

const QueryProduct: FC<QueryProductProps> = () => {
  return (
    <View>
      <ScrollView w="100%">
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          w={{
            base: '100%',
            md: '25%',
          }}>
          <Formik
            validationSchema={QueryProductSchema}
            initialValues={{
              name: '',
            }}
            onSubmit={values => console.log(values)}>
            {({values, errors, handleSubmit, handleChange, touched}) => {
              return (
                <Box>
                  <Box>
                    <Text bold fontSize="xl" mb="4">
                      Find your product details below
                    </Text>
                    <FormControl
                      mb="2"
                      isInvalid={touched.name && !!errors.name}>
                      <FormControl.Label />
                      <Input
                        placeholder="Mango"
                        type="text"
                        value={values.name}
                        onChangeText={handleChange('name')}
                      />
                      <FormControl.HelperText>
                        What is this product? e.g. A bag of apple, a bottle of
                        ketchup etc.
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.name}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <Button onPress={handleSubmit}>Find</Button>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </Stack>
      </ScrollView>
    </View>
  );
};

export default QueryProduct;
// generate an button with icons in react native?

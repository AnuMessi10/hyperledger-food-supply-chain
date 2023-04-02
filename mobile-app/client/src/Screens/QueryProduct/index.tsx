import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  ScrollView,
  Stack,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {REQUIRED_FIELD_MESSAGE} from '../../Constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface QueryProductProps {
  navigation: NativeStackNavigationHelpers;
}

const {object, string, number} = Yup;

const QueryProductSchema = object({
  name: string().required(REQUIRED_FIELD_MESSAGE),

});

const QueryProduct: FC<QueryProductProps> = ({navigation}) => {
  return (
    <Box bgColor={'cyan.100'}>
      <View style={styles.main}>
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          >
          <Formik
            validationSchema={QueryProductSchema}
            initialValues={{
              name: '',
            }}
            onSubmit={values => {
              console.log('====================================');
              console.log(values);
              console.log('====================================');
                navigation.navigate('Register')
            }}>
            {({values, errors, handleSubmit, handleChange, touched}) => {
              return (
                <Box
                  borderWidth={2}
                  borderColor={'blue.300'}
                  borderRadius={'lg'}>
                  <Box style={styles.box}>
                    <Heading
                      color={'blue.700'}
                      textAlign={'center'}
                      variant="h3"
                      mb="4">
                      Find your product
                    </Heading>
                    <FormControl width={'72'}
                      mb="2" style={styles.input}
                      isInvalid={touched.name && !!errors.name}>
                      <FormControl.Label>Enter your product name</FormControl.Label>
                      <Input borderRadius={'lg'} borderColor={'blue.500'}
                        placeholder="Mango"
                        type="text"
                        value={values.name}
                        onChangeText={handleChange('name')}
                      />
                      <FormControl.HelperText>
                        E.g. A bag of apple
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.name}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <Box>
                      <Button
                        variant="outline"
                        borderRadius="full"
                        borderColor={'blue.500'}
                        colorScheme={'blue'}
                        mb="4"
                        onPress={handleSubmit}>
                        Find
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </Stack>
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
    marginTop:"30%",
    
    
  },
  box: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    display: 'flex',
    marginVertical:"15%"
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
export default QueryProduct;
// generate an button with icons in react native?

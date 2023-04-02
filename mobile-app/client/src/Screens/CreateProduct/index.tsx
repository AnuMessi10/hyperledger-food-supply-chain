import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
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

export interface CreateProductProps {
  navigation: NativeStackNavigationHelpers;
}

const {object, string, number} = Yup;

const createProductSchema = object({
  name: string().required(REQUIRED_FIELD_MESSAGE),
  quantity: string().required(REQUIRED_FIELD_MESSAGE),
  price: number()
    .required(REQUIRED_FIELD_MESSAGE)
    .positive('Please enter a valid price!'),
});

const CreateProduct: FC<CreateProductProps> = () => {
  const getProductImage = async (handleChange: any) => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (!result.didCancel) {
      if (result.assets !== undefined) {
        handleChange(result.assets[0].uri);
      }
    }
    // await launchCamera({
    //   mediaType: 'photo',
    // })
    //   .then(result => {
    //     result.assets && handleChange(result.assets[0].uri);
    //     console.log(result);
    //   })
    //   .catch(err => console.error(err));
  };

  return (
    <Box bgColor={'cyan.100'}>
      <View style={styles.main}>
      <Box borderWidth={2}  borderColor={'blue.300'} borderRadius={'lg'} style={styles.box}>
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
            validationSchema={createProductSchema}
            initialValues={{
              name: '',
              quantity: '',
              price: 0,
              imageUri: '',
            }}
            onSubmit={values => console.log(values)}>
            {({values, errors, handleSubmit, handleChange, touched}) => {
              return (
                <Box>
                  <Box>
                  <Heading color={'blue.700'} textAlign={'center'} variant="h3" mb="4" >Add your Product</Heading>
                    <FormControl width={'72'}
                      mb="2"
                      isInvalid={touched.name && !!errors.name}>
                      <FormControl.Label>Name</FormControl.Label>
                      <Input borderRadius={'lg'} borderColor={'blue.500'}
                        placeholder="Honey"
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
                  </Box>
                  <Box>
                    <FormControl
                      mb="2"
                      isInvalid={touched.quantity && !!errors.quantity}>
                      <FormControl.Label>Quantity</FormControl.Label>
                      <Input borderRadius={'lg'} borderColor={'blue.500'}
                        placeholder="20 pots of honey"
                        type="text"
                        value={values.quantity}
                        onChangeText={handleChange('quantity')}
                      />
                      <FormControl.HelperText>
                        E.g. 100 apples.
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.quantity}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      mb="2"
                      isInvalid={touched.price && !!errors.price}>
                      <FormControl.Label>Price</FormControl.Label>
                      <Input borderRadius={'lg'} borderColor={'blue.500'}
                        placeholder="20 pots of honey"
                        type="text"
                        value={`${values.price}`}
                        onChangeText={handleChange('price')}
                      />
                      <FormControl.HelperText>
                        Eg 100/kg
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.price}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl mb="6">
                      <FormControl.Label>Image</FormControl.Label>
                      <Center>
                        <Button
                          variant={'unstyled'}
                          onPress={() =>
                            getProductImage(handleChange('imageUri'))
                          }>
                          {values.imageUri ? (
                            <Image
                              source={{
                                uri: values.imageUri,
                              }}
                              alt="product-image"
                              height={125}
                              width={125}
                            />
                          ) : (
                            <Image
                              source={{
                                uri: 'http://via.placeholder.com/125x125',
                              }}
                              alt="product-image"
                              height={125}
                              width={125}
                            />
                          )}
                        </Button>
                      </Center>
                    </FormControl>
                  </Box>
                  <Box>
                    <Button variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'} mb="4" onPress={handleSubmit}>Create your product</Button>
                  </Box>
                </Box>
              );
            }}
          </Formik>
        </Stack>
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
    paddingHorizontal: 25,
    paddingVertical: 20,
    display: 'flex',
    marginVertical:"14%",
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

export default CreateProduct;

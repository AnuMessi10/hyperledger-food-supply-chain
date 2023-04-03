import {View, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React, {FC} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  // Image,
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
// import {launchImageLibrary} from 'react-native-image-picker';

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
  // const getProductImage = async (handleChange: any) => {
  //   let result = await launchImageLibrary({
  //     mediaType: 'photo',
  //   });

  //   if (!result.didCancel) {
  //     if (result.assets !== undefined) {
  //       handleChange(result.assets[0].uri);
  //     }
  //   }
  //   // await launchCamera({
  //   //   mediaType: 'photo',
  //   // })
  //   //   .then(result => {
  //   //     result.assets && handleChange(result.assets[0].uri);
  //   //     console.log(result);
  //   //   })
  //   //   .catch(err => console.error(err));
  // };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = (handleChange: any) => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            // handleChange({
            //   lat: position.coords.latitude,
            //   lng: position.coords.longitude,
            // });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const handleCreate = (values: any) => {
    fetch('http://172.31.182.164:5000/api/product/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        // id: Math.random(),
        id: Math.floor(Math.random() * 1000),
        actor: 'PRODUCER',
      }),
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

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
            validationSchema={createProductSchema}
            initialValues={{
              name: '',
              quantity: '',
              price: 0,
              location: {
                lat: 19.0,
                lng: 72.0,
              },
              // imageUri: '',
            }}
            onSubmit={values => handleCreate(values)}>
            {({values, errors, handleSubmit, handleChange, touched}) => {
              return (
                <Box>
                  <Box>
                    <Text bold fontSize="xl" mb="4">
                      Add your product details below
                    </Text>
                    <FormControl
                      mb="2"
                      isInvalid={touched.name && !!errors.name}>
                      <FormControl.Label>Name</FormControl.Label>
                      <Input
                        placeholder="Honey"
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
                    <FormControl
                      mb="2"
                      isInvalid={touched.quantity && !!errors.quantity}>
                      <FormControl.Label>Quantity</FormControl.Label>
                      <Input
                        placeholder="20 pots of honey"
                        type="text"
                        value={values.quantity}
                        onChangeText={handleChange('quantity')}
                      />
                      <FormControl.HelperText>
                        How many of items of the product are included? e.g. 100
                        apples, 50 litres of oil etc.
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
                      <Input
                        placeholder="20 pots of honey"
                        type="text"
                        value={`${values.price}`}
                        onChangeText={handleChange('price')}
                      />
                      <FormControl.HelperText>
                        What is the value of this product in ₹?
                      </FormControl.HelperText>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.price}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box mb={10}>
                    <FormControl
                      isInvalid={touched.location && !!errors.location}>
                      <FormControl.Label>Location</FormControl.Label>
                      <FormControl.HelperText mb={5}>
                        <Text>
                          Your location is Latitude: {values.location.lat},
                          Longitude: {values.location.lng}
                        </Text>
                      </FormControl.HelperText>
                      <Center>
                        <Button
                          width={'20%'}
                          onPress={() => getLocation(handleChange('location'))}>
                          Fetch
                        </Button>
                      </Center>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.price}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  {/* <Box>
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
                  </Box> */}
                  <Box>
                    <Button onPress={handleSubmit}>Create your product</Button>
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

export default CreateProduct;

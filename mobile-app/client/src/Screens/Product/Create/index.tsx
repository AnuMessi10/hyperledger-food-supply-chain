import {View, PermissionsAndroid, StyleSheet, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
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
import {REQUIRED_FIELD_MESSAGE} from '../../../Constants';
import FoodModel from '../../../Models/Food';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Location} from '../../../Models/Food/@types';

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
  location: object({
    lat: number().required('Invalid coordinate type, try again'),
    lng: number().required('Invalid coordinate type, try again'),
  }).required('Please allow access to your location coordinates'),
  imageUri: string().required(
    'You need to provide an image of the product before proceeding!',
  ),
});

const CreateProduct: FC<CreateProductProps> = () => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>();

  const getProductImage = async (
    handleChange: any,
    source: 'gallery' | 'camera',
  ) => {
    let result;
    if (source === 'gallery') {
      result = await launchImageLibrary({
        mediaType: 'photo',
      });
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'FoodNet needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        result = await launchCamera({
          mediaType: 'photo',
        });
      }
    }

    if (result && !result.didCancel) {
      if (result.assets !== undefined) {
        const uri = result.assets[0].uri;
        const type = 'image/jpg';
        const name = result.assets[0].fileName;
        const src = {uri, type, name};
        uploadToCloudinary(src);
        handleChange(uri);
      }
    }
  };

  const uploadToCloudinary = async (photo: any) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'foodsupplychain');
    data.append('cloud_name', 'foodsupplychain');
    const getUploadInfo = await FoodModel.imgToCloudinary(data);
    setCloudinaryUrl(getUploadInfo.url);
  };

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
      if (granted === 'granted') {
        return true;
      } else {
        Alert.alert('Location Permission Denied');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = (handleChange: any) => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position.coords);
          },
          error => {
            // See error code charts below.
            console.error(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const handleCreate = async (values: any) => {
    await FoodModel.createProduct({
      ...values,
      imageUrl: cloudinaryUrl,
      id: Math.floor(Math.random() * 1000),
      actor: 'PRODUCER',
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
                lat: 19.04,
                lng: 72.84,
              } as Location,
              imageUri: '',
            }}
            onSubmit={values => handleCreate(values)}>
            {({values, errors, handleSubmit, handleChange, touched}) => {
              return (
                <Box>
                  <Box>
                    <Text bold fontSize="xl" mb="2">
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
                      mb="0"
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
                  <Box mb={2}>
                    <FormControl
                      isInvalid={touched.location && !!errors.location}>
                      <FormControl.Label>Location</FormControl.Label>
                      <FormControl.HelperText mb={3} mt={0}>
                        {values.location.lat ? (
                          <Text>
                            Your location is Latitude: {values.location.lat},
                            Longitude: {values.location.lng}
                          </Text>
                        ) : (
                          <Text>
                            Please tap the button below to fetch your location
                          </Text>
                        )}
                      </FormControl.HelperText>
                      <Center>
                        <Button
                          width={'20%'}
                          onPress={() => getLocation(handleChange)}>
                          Fetch
                        </Button>
                      </Center>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.location?.lat}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      mb="6"
                      isInvalid={touched.imageUri && !!errors.imageUri}>
                      <FormControl.Label>
                        Upload Image (Gallery or Camera)
                      </FormControl.Label>
                      <Center>
                        <Box mt={2}>
                          {values.imageUri ? (
                            <>
                              <Image
                                source={{
                                  uri: values.imageUri,
                                }}
                                alt="product-image"
                                height={125}
                                width={125}
                              />
                              <Button
                                variant="outline"
                                style={styles.closeBtn}
                                onPress={() => handleChange('imageUri')}>
                                <Icon name="close" />
                              </Button>
                            </>
                          ) : (
                            <Box style={styles.imageOptions}>
                              <Box>
                                <Button
                                  style={styles.imgOptionBtn}
                                  onPress={() =>
                                    getProductImage(
                                      handleChange('imageUri'),
                                      'gallery',
                                    )
                                  }>
                                  From Gallery
                                </Button>
                              </Box>
                              <Box>
                                <Button
                                  style={styles.imgOptionBtn}
                                  onPress={() =>
                                    getProductImage(
                                      handleChange('imageUri'),
                                      'camera',
                                    )
                                  }>
                                  From Camera
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Center>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.imageUri}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Box>
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

const styles = StyleSheet.create({
  imageOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 15,
    height: 20,
    borderRadius: 9999,
  },
  imgOptionBtn: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default CreateProduct;

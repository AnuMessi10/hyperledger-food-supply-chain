/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {FC, useContext} from 'react';
import {Box, Button, Center, Image, Text} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import ProductContext from '../../../Navigation/ProductContext';

export interface ProductDetailsProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductDetails: FC<ProductDetailsProps> = ({navigation}) => {
  const {product} = useContext(ProductContext);
  const {name, price, quantity, imageUrl} = product;

  return (
    <View>
      <Box style={styles.detailsContainer} bgColor={'blueGray.200'}>
        <Text bold fontSize="4xl" marginTop={'3.5'} textAlign={'center'}>
          Details
        </Text>
        <Box
          style={styles.Box}
          borderRadius={'lg'}
          bgColor={'blueGray.300'}
          p="12">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View style={{flex: 0.4}}>
              <Text fontSize="lg">Name </Text>
            </View>
            <View style={{flex: 0.1}}>
              <Text fontSize="lg"> : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text fontSize="lg">{name}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View style={{flex: 0.4}}>
              <Text fontSize="lg">Category </Text>
            </View>
            <View style={{flex: 0.1}}>
              <Text fontSize="lg"> : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text fontSize="lg"> Food</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View style={{flex: 0.4}}>
              <Text fontSize="lg">Quantity </Text>
            </View>
            <View style={{flex: 0.1}}>
              <Text fontSize="lg"> : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text fontSize="lg"> {quantity}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View style={{flex: 0.4}}>
              <Text fontSize="lg">Price </Text>
            </View>
            <View style={{flex: 0.1}}>
              <Text fontSize="lg"> : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text fontSize="lg"> {price}</Text>
            </View>
          </View>
        </Box>
        <Center>
          <Box>
            <Image
              source={{uri: imageUrl}}
              alt="food-product"
              height={200}
              width={200}
            />
          </Box>
        </Center>
        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}
          onPress={() => navigation.navigate('ProductLocation')}>
          Location
        </Button>
        {/* <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          History
        </Button>
        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Scan
        </Button> */}
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 30,
    marginTop: 15,
  },
  detailsContainer: {
    borderWidth: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 25,
    height: '110%',
    borderColor: 'skyblue',
  },
  Button: {
    marginHorizontal: '15%',
    marginVertical: '3%',
  },
  Box: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: '8%',
    marginVertical: '4%',
    justifyContent: 'center',
    // backgroundColor:'red'

    // minHeight:"fit-content"
    // height:"10%"
  },
});
export default ProductDetails;
// change text color of react native button?

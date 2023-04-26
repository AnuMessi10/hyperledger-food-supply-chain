/* eslint-disable react-native/no-inline-styles */
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Button, Text} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Food} from '../../../Models/Food/@types';
import ProductContext from '../../../Navigation/ProductContext';
import FoodModel from '../../../Models/Food';

export interface AllProductsProps {
  navigation: NativeStackNavigationHelpers;
}

const AllProducts: FC<AllProductsProps> = ({navigation}) => {
  const [allProducts, setAllProducts] = useState<Food[]>([]);
  const {setProduct} = useContext(ProductContext);

  useEffect(() => {
    const init = async () => {
      const foodProducts = await FoodModel.getAllProducts();
      setAllProducts(foodProducts);
    };
    init();
  }, []);

  const handleProductLocation = (e: GestureResponderEvent, food: Food) => {
    setProduct({...food});
    navigation.navigate('ProductLocation');
  };

  return (
    <View>
      <Box style={styles.detailsContainer} bgColor={'blueGray.200'}>
        <Text bold fontSize="4xl" marginTop={'3.5'} textAlign={'center'}>
          Ledger State
        </Text>
        <View style={{flexDirection: 'row', padding: 5, height: 50}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text>Name</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text>Actor</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text>Location</Text>
          </View>
        </View>
        {allProducts.map((item: Food) => (
          <View key={item.name} style={{flexDirection: 'row', padding: 5}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <Button
                variant="unstyled"
                py={0.5}
                paddingX={0}
                onPress={() => {
                  setProduct(item);
                  navigation.navigate('ProductDetails');
                }}>
                {item.name}
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <Text>
                {item.actor.slice(0, 1).toUpperCase() +
                  item.actor.slice(1).toLowerCase()}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}>
              <Button
                variant="unstyled"
                py={0.5}
                paddingX={0}
                onPress={(e: GestureResponderEvent) =>
                  handleProductLocation(e, item)
                }>
                View
              </Button>
            </View>
          </View>
        ))}
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
export default AllProducts;
// change text color of react native button?

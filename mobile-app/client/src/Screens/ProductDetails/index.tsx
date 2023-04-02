import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {
  Box,
  Button,
  Container,
  Fab,
  Heading,
  IconButton,
  Input,
  SearchIcon,
  Text,
} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {flexbox} from 'native-base/lib/typescript/theme/styled-system';
export interface ProductDetailsProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductDetails: FC<ProductDetailsProps> = ({}) => {
  return (
    <Box bgColor={'cyan.100'} style={styles.root}>
      <View style={styles.search}>
        <View style={{flex: 0.7, marginRight: 20}}>
          <Input borderRadius={'lg'} borderColor={'blue.500'}  placeholder="Apples" />
        </View>
        <View  style={{flex: 0.15, alignItems:"center", justifyContent:"center"}} >

            <IconButton
              variant={'outline'}
              icon={<SearchIcon/>}
              onPress={()=>{
              console.log('hello')
              }}
            />
        </View>
      </View>
      <Box style={styles.detailsContainer} bgColor={'cyan.100'}>
      <Heading color={'blue.700'} textAlign={"center"} fontSize={'3xl'} mt="10" > Details </Heading>
        <Box
          style={styles.Box}
          borderRadius={'lg'}
          bgColor={'cyan.200'}
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
              <Text fontSize="lg"> Apple Jam</Text>
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
              <Text fontSize="lg"> 75.00 kg</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
            }}>
            <View style={{flex: 0.4}}>
              <Text fontSize="lg">Location </Text>
            </View>
            <View style={{flex: 0.1}}>
              <Text fontSize="lg"> : </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text fontSize="lg"> Mumbai</Text>
            </View>
          </View>
        </Box>

        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Location
        </Button>
        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          History
        </Button>
        <Button marginBottom={'10'}
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Scan
        </Button>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  root: {
    // minHeight: height - 200,
    height:"110%",
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginHorizontal: 30,
    marginTop:"13%",
    marginBottom:"8%"
  },
  detailsContainer: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'skyblue',
    marginHorizontal:"4%"
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

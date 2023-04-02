import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  SearchIcon,
  Select,
  Text,
} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

export interface ShipProductProps {
  navigation: NativeStackNavigationHelpers;
}

const ShipProduct: FC<ShipProductProps> = ({}) => {
  return (
    <View>
      <View style={styles.search}>
        <View style={{flex: 0.7, marginRight: 20}}>
          <Input placeholder="Default Input" borderRadius={'lg'} />
        </View>
        <View
          style={{flex: 0.15, alignItems: 'center', justifyContent: 'center'}}>
          <IconButton
            variant={'outline'}
            icon={<SearchIcon />}
            onPress={() => {
              console.log('hello');
            }}
          />
        </View>
      </View>
      <Box style={styles.detailsContainer} bgColor={'blueGray.200'}>
        <Text bold fontSize="4xl" marginTop={'3.5'} textAlign={'center'}>
          Ship
        </Text>
        <Box
          style={styles.Box}
          borderRadius={'lg'}
          bgColor={'blueGray.300'}
          paddingY={2}>
          <Select
            fontSize={'lg'}
            borderRadius={'lg'}
            placeholderTextColor={'black'}
            placeholder="Ship To "
            minWidth="64">
            <Select.Item label="Customer" value="Customer" />
            <Select.Item label="Distributer" value="Distributer" />
            <Select.Item label="Wholesaler" value="Wholesaler" />
            <Select.Item label="Retailer" value="Retailer" />
            <Select.Item label="Manufacturer" value="Manufacturer" />
          </Select>
        </Box>

        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Back
        </Button>
        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Confirm
        </Button>
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
    marginHorizontal: '15%',
    marginVertical: '4%',
    justifyContent: 'center',
  },
});
export default ShipProduct;
// change text color of react native button?

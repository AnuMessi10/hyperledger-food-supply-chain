import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Box, Button, IconButton, Input, SearchIcon, Text} from 'native-base';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
// import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker} from 'react-native-maps';

const coordinate = {
  latitude: 19.2228481,
  longitude: 72.8683325,
};

export interface ProductionLocationProps {
  navigation: NativeStackNavigationHelpers;
}

const ProductionLocation: FC<ProductionLocationProps> = ({}) => {
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
          Location
        </Text>
        <Box
          style={styles.Box}
          borderRadius={'lg'}
          bgColor={'blueGray.300'}
          paddingY={2}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={10}>
            <Marker
              coordinate={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              }}
            />
          </MapView>
        </Box>

        <Button
          style={styles.Button}
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}>
          Back
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
    marginHorizontal: '10%',
    marginVertical: '4%',
    justifyContent: 'center',
    height: '40%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default ProductionLocation;
// change text color of react native button?

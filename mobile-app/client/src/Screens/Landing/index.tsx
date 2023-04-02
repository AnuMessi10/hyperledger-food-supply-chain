import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import {Box, Button, Heading, Text} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

export interface ILandingProps {
  navigation: NativeStackNavigationHelpers;
}

const Landing: FC<ILandingProps> = ({navigation}) => {
  return (
    <Box bgColor={'cyan.100'} style={styles.root}>
      <Box borderWidth={2}  borderColor={'blue.300'} borderRadius={'lg'} style={styles.box} >
      <Heading color={'blue.700'} variant="h3" mb="4" > Welcome to the app!</Heading>
      <Button
        marginTop={10}
        width="3xs"
        variant="outline"
        borderRadius="full"
        borderColor={'blue.500'}
        colorScheme={'blue'}
        onPress={() => navigation.navigate('CreateProduct')}>
        Add/Create a Product
      </Button>
      <Button marginTop={10} width="3xs" variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}
          onPress={() => navigation.navigate('QueryProduct')}
          >
        View your product
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
  box:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 50,
    paddingVertical: 50,
    // margin: 5,
    marginVertical:"50%",
    marginHorizontal:"5%"

  }
});

export default Landing;

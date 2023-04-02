import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {FC, useState, useContext} from 'react';
import {Box, Button, Heading, Text} from 'native-base';
import OtpInputs from 'react-native-otp-inputs';
import AuthContext from '../../Navigation/AuthContext';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';

export interface IOTPProps {
  navigation: NativeStackNavigationHelpers;
}

const OTP: FC<IOTPProps> = ({navigation}) => {
  const [otp, setOtp] = useState<number>();
  const {mobile} = useContext(AuthContext);

  const verifyOTP = () => {
    fetch('http://localhost:5000/api/auth/verifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: mobile,
        otp: otp,
      }),
    })
      .then(async response => {
        const data = await response.json();
        // console.log(data, typeof data, data.type);
        if (data.type === 'success') {
          navigation.navigate('Landing');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Box bgColor={'cyan.100'} style={styles.main} >
      <Box borderWidth={2}  borderColor={'blue.300'} borderRadius={'lg'} style={styles.box}>
      <View style={{marginTop: 20}}>
        <Heading color={'blue.700'} textAlign={'center'} variant="h3" mb="4" >Enter your OTP</Heading>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <OtpInputs
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '65%',

          }}
          inputStyles={{
            color: 'blue',
            textAlign:"center",
            borderWidth: 1,
            width: 40,
            fontWeight: '800',
            fontSize: 24,
            marginHorizontal:4
          }}
          autofillFromClipboard={false}
          handleChange={code => setOtp(Number(code))}
          numberOfInputs={5}
        />
      </View>
      <View style={styles.buttons}>
      <Button
        marginTop={10}
        width="3xs"
        variant="outline"
        borderRadius="full"
        borderColor={'blue.500'}
        colorScheme={'blue'}
        >
        Resend OTP
      </Button>
      <Button marginTop={4} width="3xs" variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'}
          onPress={() => verifyOTP()}
          >
        View your Otp
      </Button>
      </View>
    </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  main:{
    height:"100%",
    display:"flex",
    alignItems:"center",
    alignContent:'center',   
    justifyContent:"center"
  },
  buttons : {
    display:"flex",
    borderColor:"pink",
    marginHorizontal:"5%"
  },
  box: {
    paddingHorizontal: 40,
    paddingVertical: 50,
    display: 'flex',
    // marginVertical:"30%",
    // marginHorizontal:"1%"
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
export default OTP;

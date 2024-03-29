import {View, SafeAreaView} from 'react-native';
import React, {FC, useState, useContext} from 'react';
import {Button, Text} from 'native-base';
import OtpInputs from 'react-native-otp-inputs';
import AuthContext from '../../Navigation/AuthContext';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import AuthModel from '../../Models/Auth';

export interface IOTPProps {
  navigation: NativeStackNavigationHelpers;
}

const OTP: FC<IOTPProps> = ({navigation}) => {
  const [otp, setOtp] = useState<number>();
  const {mobile} = useContext(AuthContext);

  const verifyOTP = async () => {
    const res = await AuthModel.verifyOTP(mobile, otp ?? 0);
    res && navigation.navigate('Landing');
  };

  return (
    <SafeAreaView>
      <View style={{marginTop: 20}}>
        <Text style={{textAlign: 'center'}}>
          An OTP has been successfully sent to your mobile number {mobile}
        </Text>
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
            justifyContent: 'space-between',
            width: '65%',
          }}
          inputStyles={{
            color: '#FF007F',
            borderWidth: 1,
            width: 35,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: 24,
          }}
          autofillFromClipboard={false}
          handleChange={code => setOtp(Number(code))}
          numberOfInputs={5}
        />
      </View>
      <View>
        <Text style={{textAlign: 'center', marginTop: 20}}>
          Didn't receive the OTP? Check your spam or <Text>Resend OTP</Text>
        </Text>
      </View>
      <View style={{marginTop: 30, marginHorizontal: 15}}>
        <Button variant="solid" onPress={() => verifyOTP()}>
          Verify
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

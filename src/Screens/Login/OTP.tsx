/* eslint-disable prettier/prettier */
import {View, SafeAreaView} from 'react-native';
import React, {FC, useState} from 'react';
import {Button, Text} from 'native-base';
import OtpInputs from 'react-native-otp-inputs';

export interface IOTPProps {
  mobileNumber?: string;
}

const OTP: FC<IOTPProps> = ({mobileNumber = "91xxxxx340"}) => {

  const [otp, setOtp] = useState<number>();

  return (
    <SafeAreaView>
      <View style={{marginTop: 20}}>
        <Text style={{textAlign: 'center'}}>An OTP has been successfully sent to your mobile number {mobileNumber}</Text>
      </View>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <OtpInputs
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '65%'}}
          inputStyles={{color: '#FF007F', borderWidth: 1, width: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: "800", fontSize: 24}}
          autofillFromClipboard={false}
          handleChange={code => setOtp(Number(code))}
          numberOfInputs={5}
        />
      </View>
      <View>
        <Text style={{textAlign: 'center', marginTop: 20}}>Didn't receive the OTP? Check your spam or <Text>
        Resend OTP</Text></Text>
      </View>
      <View style={{marginTop: 30, marginHorizontal: 15}}>
        <Button variant="solid">Verify</Button>
      </View>
    </SafeAreaView>
  );
};

export default OTP;

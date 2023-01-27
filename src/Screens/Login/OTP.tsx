/* eslint-disable prettier/prettier */
import {View, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import {Text} from 'native-base';
import OtpInputs from 'react-native-otp-inputs';

export interface IOTPProps {
  mobileNumber: number;
}

const OTP: FC<IOTPProps> = ({mobileNumber}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>An OTP has been successfully sent to {mobileNumber}</Text>
      </View>
      <View>
        <OtpInputs
          autofillFromClipboard={false}
          handleChange={code => {
            console.log(code);
          }}
          numberOfInputs={5}
        />
      </View>
    </SafeAreaView>
  );
};

export default OTP;

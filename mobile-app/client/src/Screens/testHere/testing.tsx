import {View, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import {Input, Button, Heading, Box, DeleteIcon, CheckIcon, IconButton, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationHelpers} from '@react-navigation/native-stack/lib/typescript/src/types';
import { background } from 'native-base/lib/typescript/theme/styled-system';
export interface ILoginProps {
  navigation: NativeStackNavigationHelpers;
}

const Login: FC<ILoginProps> = ({navigation}) => {
  const [show, setShow] = useState<boolean>(false);

  const [formFields, setFormFields] = useState<{
    mobile?: number;
    password?: string;
  }>({});

  const handleLogin = () => {
    fetch('http://localhost:5000/api/auth/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formFields),
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
    navigation.navigate('Landing');
  };

  return (
    <Box bgColor={'cyan.100'}>
    <SafeAreaView style={styles.main}>
      <Box borderWidth={2}  borderColor={'blue.300'} borderRadius={'lg'} style={styles.Login}  >
        <View style={styles.header}>
          <Heading color={'blue.700'} variant="h3" mb="4" > Login to your account</Heading>
        </View>
        <View>
          <View style={styles.input}>
            <Input borderRadius={'lg'} borderColor={'blue.500'}
              type={'text'}
              placeholder="Enter your registered mobile number"
              onChangeText={mobile => {
                setFormFields({
                  ...formFields,
                  mobile: Number(mobile) ?? 1001,
                });
              }}
            />
          </View>
          <View style={styles.input}>
            <Input borderRadius={'lg'} borderColor={'blue.500'}
              type={show ? 'text' : 'password'}
              placeholder="Password"
              // InputRightElement={
                // <IconButton
                //   variant="solid"
                //   icon={show ? <DeleteIcon /> : <CheckIcon/>}
                //   onPress={() => setShow(!show)}
                  
                  
                // />
                
                
                // <Icon
                //   name = {}
                //   size={30}
                // />
              // }
              onChangeText={password => {
                setFormFields({
                  ...formFields,
                  password: password,
                });
              }}
            />
          </View>
        </View>
        <View>
          <Button variant="unstyled">Forgot your password?</Button>
        </View>
        <View>
          <Button 
          variant="outline"
          borderRadius="full"
          borderColor={'blue.500'}
          colorScheme={'blue'} onPress={() => handleLogin()}>
            Login
          </Button>
        </View>
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
          <Text >Don't have an account?</Text>
          <Button 
            variant="unstyled" paddingLeft={'1'}
            onPress={() => navigation.navigate('Register')}>
             <Text bold color={'blue.500'} >Sign up</Text>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
    </Box>
  );
};

const styles = StyleSheet.create({
  main:{
    height:"110%",
    display:"flex",
    alignItems:"center",
    alignContent:'center',
    marginTop:"30%",
    
    
  },
  Login: {
    paddingHorizontal: 50,
    paddingVertical: 50,
    display: 'flex',
    margin: 5,
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

export default Login;

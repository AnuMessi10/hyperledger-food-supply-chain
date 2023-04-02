import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useState} from 'react';

interface ILoginProps {
  navigation: any;
}

const Login: FC<ILoginProps> = ({navigation}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<{
    mobile?: number;
    password?: string;
  }>({});
  const handleLogin = () => {
    // handle login logic
    fetch('http://localhost:5000/api/auth/login', {
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
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Login to your account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="numeric"
            onChangeText={mobile => {
              setFormFields({
                ...formFields,
                mobile: Number(mobile) ?? 1001,
              });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={password => {
              setFormFields({
                ...formFields,
                password: password,
              });
            }}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.icon}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'skyblue',
  },
  loginContainer: {
    backgroundColor: '#BFEAF5',
    borderRadius: 10,
    padding: 25,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#82AAE3',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#91D8E4',
    borderRadius: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#82AAE3',
    borderRadius: 10,
  },
  icon: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#82AAE3',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#82AAE3',
    fontWeight: 'bold',
  },
});

export default Login;

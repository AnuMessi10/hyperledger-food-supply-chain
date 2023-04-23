import {request} from '../../Utilities/axiosUtils';
import {
  LoginResponse,
  OTPResponse,
  RegistrationFormData,
  RegistrationResponse,
} from '../Auth/@types';
import {setToken, removeToken} from '../../Utilities/asyncStorage';

const TOKEN_KEY = 'access_token';

class AuthModel {
  static isRegistered = (email: string) =>
    request({url: 'users/is-registered', params: {email}});

  static register = async (
    registrationFormData: RegistrationFormData,
  ): Promise<void> => {
    try {
      delete registrationFormData.confirmPassword;
      await request<RegistrationResponse>({
        url: '/auth/register',
        method: 'post',
        data: registrationFormData,
      });
    } catch (error) {
      throw error;
    }
  };

  static login = async (mobile: number, password: string): Promise<boolean> => {
    try {
      const res = await request<LoginResponse>({
        url: '/auth/login',
        method: 'post',
        data: {mobile, password},
      });
      const {data} = res;
      const token = data.token;
      await setToken(TOKEN_KEY, token);
      return true;
    } catch (error) {
      throw error;
    }
  };

  static verifyOTP = async (mobile: number, otp: number): Promise<boolean> => {
    try {
      const res = await request<OTPResponse>({
        url: '/auth/verifyOtp',
        method: 'post',
        data: {mobile, otp},
      });
      const {data} = res;
      await setToken(TOKEN_KEY, data.token);
      return true;
    } catch (error) {
      throw error;
    }
  };

  static logOut = async () => {
    let resp;
    try {
      resp = await request({
        url: '/auth/logout',
        method: 'post',
      });

      await removeToken(TOKEN_KEY);
    } catch (error) {
      throw error;
    }
    return resp;
  };

  // static verifyToken = async (formData: {email: string; token: string}) => {
  //   const res = await request({
  //     url: 'users/verifyToken',
  //     method: 'post',
  //     data: formData,
  //   });
  //   return {...parseUser(res), accessToken: res.accessToken};
  // };

  // static sendToken = (data: {phone: Phone} | {email: string}) =>
  //   request({url: 'users/sendToken', method: 'post', data});

  // static getUser = async (userId: string) => {
  //   const res = await request({
  //     url: `users/${userId}`,
  //     params: {filter: {include: 'roles'}},
  //   });
  //   return parseUser(res) as User;
  // };
}

export default AuthModel;

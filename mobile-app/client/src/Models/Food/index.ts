import {request} from '../../Utilities/axiosUtils';
import {Token} from '../Auth/@types';

class UserModel {
  static isRegistered = (email: string) =>
    request({url: 'users/is-registered', params: {email}});

  static login = async (credentials: {email: string; password: string}) => {
    const data = await request<any>({
      url: '/users/login',
      method: 'post',
      data: {...credentials, email: credentials.email.toLowerCase()},
    }).catch(err => {
      throw err;
    });

    const Token: Token = {
      accessToken: data.id,
      userId: data.userId,
      ttl: data.ttl,
      created: data.created,
    };

    return Token;
  };

  static logOut = async () => {
    let resp;
    try {
      resp = await request({
        url: '/users/logout',
        method: 'post',
      });
    } catch (error) {
      throw error;
    }
    return resp;
  };

  static signUp = async (formData: SignUpForm) => {
    delete formData.repeatPassword;
    const res = await request({
      url: 'users/signUpAuth',
      method: 'post',
      data: parseUserFormData(formData),
    });
    return {...parseUser(res), accessToken: res.accessToken};
  };

  static verifyToken = async (formData: {email: string; token: string}) => {
    const res = await request({
      url: 'users/verifyToken',
      method: 'post',
      data: formData,
    });
    return {...parseUser(res), accessToken: res.accessToken};
  };

  static sendToken = (data: {phone: Phone} | {email: string}) =>
    request({url: 'users/sendToken', method: 'post', data});

  static getUser = async (userId: string) => {
    const res = await request({
      url: `users/${userId}`,
      params: {filter: {include: 'roles'}},
    });
    return parseUser(res) as User;
  };
}

export default UserModel;

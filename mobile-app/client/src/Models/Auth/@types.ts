import {Actor} from '../Food/@types';

export interface Token {
  accessToken: string;
  userId: string;
  ttl: number;
  created: string;
}
// TODO Create a generic type for response
export interface LoginResponse {
  type: string;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface User {
  id: string;
  name: string;
  mobile: number;
  actor: Actor;
}

export interface RegistrationFormData {
  name: string;
  mobile: number;
  password: string;
  confirmPassword?: string;
  actor: Actor;
}

export interface RegistrationResponse {
  type: string;
  message: string;
  data: {
    id: User['id'];
  };
}

export interface OTPResponse {
  type: string;
  message: string;
  data: {
    token: string;
    id: string;
  };
}

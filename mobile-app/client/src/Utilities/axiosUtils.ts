import axios, {AxiosResponse} from 'axios';
import type {AxiosError, AxiosRequestConfig} from 'axios';

const responseLogger = (res: AxiosResponse) => {
  console.log(
    '%c Request => ',
    'font-size: 12px; color: rgb(0, 204, 102); font-weight: bold',
    `${res.config.url}`,
  );
  console.log(
    '%c Config  => ',
    'font-size: 12px; color: rgb(51, 102, 255); font-weight: bold',
    res.config,
  );
  console.log(
    '%c Response => ',
    'font-size: 12px; color: rgb(0, 204, 102); font-weight: bold',
    res.data,
  );
  return res;
};

axios.interceptors.response.use(responseLogger);

export const request = async <T = Record<string, any>>(
  config: AxiosRequestConfig,
  log = true,
): Promise<T> => {
  if (!axios.defaults.baseURL) {
    throw new Error('Error: Base Url is not provided');
  }
  const resp = await axios.request<T>(config);
  return resp.data;
};

export namespace AxiosUtils {
  export const setBaseAPI_URL = (url: string) => (axios.defaults.baseURL = url);

  export const setHeader = (
    type = 'Content-Type',
    value = 'application/json',
  ) => (axios.defaults.headers.post[type] = value);

  export const setAuthHeader = async (access_token?: string) => {
    axios.defaults.headers.common.Authorization = access_token;
  };

  export const throwError = (error: AxiosError) => {
    console.log('Error', error.response);
    throw error;
  };
}

export default AxiosUtils;

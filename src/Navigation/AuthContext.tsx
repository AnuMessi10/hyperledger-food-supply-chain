/* eslint-disable prettier/prettier */
import {createContext} from 'react';

const AuthContext = createContext<{
  mobile: number,
  setMobile: React.Dispatch<React.SetStateAction<{}>>
}>({
  mobile: 10012,
  setMobile: () => {},
});

export default AuthContext;

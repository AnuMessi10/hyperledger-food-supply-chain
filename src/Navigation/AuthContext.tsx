import {createContext} from 'react';

const AuthContext = createContext<{
  mobile: number;
  setMobile: React.Dispatch<React.SetStateAction<number>>;
}>({
  mobile: -1,
  setMobile: () => {},
});

export default AuthContext;

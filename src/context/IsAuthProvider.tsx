import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface Props {
  children: ReactElement;
}
interface AuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}
const initialState = {
  isAuth: false,
  setIsAuth: () => {},
};
export const IsAuthContext = createContext<AuthContext>(initialState);

export const IsAuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </IsAuthContext.Provider>
  );
};

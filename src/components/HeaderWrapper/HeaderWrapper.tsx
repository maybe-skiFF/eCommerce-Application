import { PropsWithChildren } from 'react';
import { Header } from '../Header/Header';

export function HeaderWrapper(props: PropsWithChildren<object>) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
}

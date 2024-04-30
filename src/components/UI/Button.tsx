import { ReactNode } from 'react';

export const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button>
      <h1>{children}</h1>
    </button>
  );
};

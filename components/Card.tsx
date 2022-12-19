import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`card flex flex-col gap-y-3 ${className || 'items-center justify-center'}`}
    >
      {children}
    </div>
  );
};

export default Card;

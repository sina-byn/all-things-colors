import { FC } from 'react';

interface SpinnerProps {
  className: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={`spinner aspect-square rounded-full border-[3px] animate-spin ${className}`}
    />
  );
};

export default Spinner;

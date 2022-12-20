import {
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useContext,
} from 'react';

// * context
import { AppCtx } from '../context/AppContextProvider';

// * utils
import { copyToClipboard } from '../utils/functions';

// * interfaces
interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
  rest?: string[];
}

const Button: FC<ButtonProps> = ({ className, onClick, children, ...rest }) => {
  const { setNotifs } = useContext(AppCtx)!;

  const copyHandler = (e: MouseEvent) => {
    const button = e.target as HTMLElement;
    const { value, message } = button.dataset;

    if (!message || !value) return;

    copyToClipboard(value);
    setNotifs(prev => [...prev, message]);
  };

  return (
    <button
      type='button'
      className={`font-medium text-sm sm:text-base rounded-md ${className}`}
      onClick={onClick || copyHandler}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

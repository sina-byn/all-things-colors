import { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    onClick: MouseEventHandler;
    children: ReactNode;
    rest?: string[];
}

const Button: FC<ButtonProps> = ({ onClick, children, ...rest }) => {
    return (
        <button type='button' onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;
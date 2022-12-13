import { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    className?: string;
    onClick: MouseEventHandler;
    children: ReactNode;
    rest?: string[];
}

const Button: FC<ButtonProps> = ({ className, onClick, children, ...rest }) => {
    return (
        <button type='button' className={className || ''} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;
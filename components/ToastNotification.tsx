import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// * interfaces
interface ToastNotificationProps {
  message: string;
}

const ToastNotification: FC<ToastNotificationProps> = ({ message }) => {
  const [isShown, setIsShown] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsShown(prev => !prev), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!isShown) return null;

  return createPortal(
    <div
      className='w-fit fade-out rounded-lg px-2 py-1'
    >
      {message}
    </div>,
    document.getElementById('toast-notif-container')!
  );
};

export default ToastNotification;

import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// * interfaces
interface ToastNotificationProps {
  message: string;
}

const ToastNotification: FC<ToastNotificationProps> = ({ message }) => {
  const [isShown, setIsShown] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsShown(prev => !prev), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!isShown) return null;

  return createPortal(
    <div className='w-fit fade-out text-sm xs:text-base bg-gradient-to-br from-purple-100 via-cyan-50 to-pink-100 rounded-lg shadow-lg px-4 py-3'>
      {message}
    </div>,
    document.getElementById('toast-notif-container')!
  );
};

export default ToastNotification;

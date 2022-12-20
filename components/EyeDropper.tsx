import { FC } from 'react';

// * components
import Button from './Button';
import ColorCard from './ColorCard';

// * hooks
import useEyeDropper from '../hooks/useEyeDropper';

const EyeDropper: FC = () => {
  const { isSupported, eyeDropper, pickedColor, setPickedColor } =
    useEyeDropper();

  if (!isSupported) return null;

  const openHandler = () => {
    eyeDropper.open().then((colorObj: object) => {
      const color = Object.values(colorObj)[0];

      if (!color) return;

      setPickedColor(color);
    });
  };

  return (
    <section className='eye-dropper-section flex flex-col items-center justify-center'>
      {pickedColor.length > 0 && (
        <ColorCard color={pickedColor} className='w-[100px] rounded-md' />
      )}
      <Button
        onClick={openHandler}
        className='border-2 border-zinc-700 px-2 pt-1 pb-1.5 mt-5'
      >
        <i className='fa-solid fa-eye-dropper mr-2' />
        Eye Dropper
      </Button>
    </section>
  );
};

export default EyeDropper;

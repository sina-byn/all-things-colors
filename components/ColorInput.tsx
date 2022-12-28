import { FC, Dispatch, SetStateAction } from 'react';

// * react-colorful
import { HexColorPicker } from 'react-colorful';

// * components
import Button from './Button';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
interface ColorInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>> | Function;
}

const ColorInput: FC<ColorInputProps> = ({ value, setValue }) => {
  const changeHandler = (color: string) => setValue(color);

  return (
    <div className='color-input w-[80px] flex flex-col items-center gap-y-3 my-5'>
      <HexColorPicker color={value} onChange={changeHandler} />
      <Button
        data-value={value}
        data-message={readMessage('message.notifs.color')}
        className='border-2 border-zinc-700 px-3 py-0.5'
      >
        {value}
      </Button>
    </div>
  );
};

export default ColorInput;

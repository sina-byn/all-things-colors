import { FC, useId, Dispatch, SetStateAction, ChangeEvent } from 'react';

// * components
import Button from './Button';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
interface ColorInputProps {
  value: string;
  className?: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const ColorInput: FC<ColorInputProps> = ({ value, setValue, className }) => {
  const id = useId();
  const changeHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setValue(input.value);
  };

  return (
    <div
      className={`color-input flex ${className || 'items-center gap-x-3 mb-5'}`}
    >
      <label
        htmlFor={`color-input-${id}`}
        style={{ background: value }}
        className='min-w-[100px] aspect-square rounded-lg shadow-lg cursor-pointer'
      >
        <input
          type='color'
          value={value}
          className='hidden'
          id={`color-input-${id}`}
          onChange={changeHandler}
        />
      </label>
      <Button
        data-value={value}
        data-message={readMessage('message.notifs.color')}
        className='border-2 border-zinc-700 rounded-md font-medium px-2 py-1'
      >
        {value}
      </Button>
    </div>
  );
};

export default ColorInput;

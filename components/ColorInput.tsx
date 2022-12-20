import { FC, useId, Dispatch, SetStateAction, ChangeEvent } from 'react';

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
  const id = useId();
  const changeHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setValue(input.value);
  };

  return (
    <div className='color-input w-[80px] flex flex-col gap-y-3 my-5'>
      <div className='label-wrap w-full bg-gray-300 aspect-square rounded-lg shadow-lg p-2'>
        <label
          htmlFor={`color-input-${id}`}
          style={{ background: value }}
          className='inline-block w-full h-full cursor-pointer rounded-md'
        >
          <input
            type='color'
            value={value}
            className='hidden'
            id={`color-input-${id}`}
            onChange={changeHandler}
          />
        </label>
      </div>
      <Button
        data-value={value}
        data-message={readMessage('message.notifs.color')}
        className='border-2 border-zinc-700'
      >
        {value}
      </Button>
    </div>
  );
};

export default ColorInput;

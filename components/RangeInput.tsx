import { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';

interface RangeInputProps {
  title: string;
  value: number;
  setValue: Function;
}

const RangeInput: FC<RangeInputProps> = ({ title, value, setValue }) => {
    const changeHandler = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const { value } = input;
        setValue(value);
    };
  return (
    <div className='range-input flex flex-col gap-y-2'>
      <label className='font-medium text-lg'>{title}</label>
      <input type='range' value={value} onChange={changeHandler} className='accent-zinc-700 max-w-[250px]' />
    </div>
  );
};

export default RangeInput;

import { FC, ChangeEvent } from 'react';

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
    <div className='range-input flex flex-col justify-self-center -mt-5'>
      <label className='font-medium text-md'>{title}</label>
      <input type='range' value={value} onChange={changeHandler} className='accent-zinc-700' />
    </div>
  );
};

export default RangeInput;

import { FC, ChangeEvent } from 'react';

interface RangeInputProps {
  titles: [string, string];
  value: number;
  setValue: Function;
}

const RangeInput: FC<RangeInputProps> = ({ titles, value, setValue }) => {
  const changeHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const { value } = input;
    setValue(value);
  };
  return (
    <div className='range-input flex flex-col justify-self-center -mt-5'>
      <div className='title flex justify-between'>
        <label className='font-medium text-[0.8rem] md:text-base md:-ml-5'>{titles[0]}</label>
        <label className='font-medium text-[0.8rem] md:text-base md:-mr-5'>{titles[1]}</label>
      </div>
      <input
        type='range'
        value={value}
        onChange={changeHandler}
        className='accent-zinc-700'
      />
    </div>
  );
};

export default RangeInput;

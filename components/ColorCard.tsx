import { FC } from 'react';

// * utils
import { copyToClipboard, toHexString, toRgbString } from '../utils/functions';

// * interfaces
import { RgbObject } from '../utils/functions';

interface ColorCardProps {
  percent: number;
  rgbObj: RgbObject;
}

const ColorCard: FC<ColorCardProps> = ({ percent, rgbObj }) => {
  const hexColor = toHexString(rgbObj);

  return (
    <div className='card-container flex flex-col items-center gap-y-2'>
      <span className='bg-zinc-600 text-gray-200 px-3 pb-0.5 rounded-md'>
        {percent}%
      </span>
      <div
        style={{ background: toRgbString(rgbObj) }}
        className='color-card w-full flex items-center justify-center aspect-square'
      >
        <i
          data-value={hexColor}
          onClick={copyToClipboard}
          className='fa-solid fa-clipboard fa-2xl text-white transition-all duration-300 cursor-pointer'
        />
      </div>
      <span className='font-medium -mt-1'>{hexColor}</span>
    </div>
  );
};

export default ColorCard;

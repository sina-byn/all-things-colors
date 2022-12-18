import { FC } from 'react';

// * components
import Button from './Button';

// * utils
import { generateComplementeryColor } from '../utils/color-generation';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
interface ColorCardProps {
  color: string;
  percent?: number;
}

const ColorCard: FC<ColorCardProps> = ({ percent, color }) => {
  return (
    <div className='card-container w-full flex flex-col items-center gap-y-2'>
      {percent !== undefined && (
        <span className='bg-zinc-600 text-gray-200 px-3 pb-0.5 rounded-md'>
          {percent}%
        </span>
      )}
      <div
        style={{ background: color }}
        className='color-card w-full flex items-center justify-center aspect-square shadow-md'
      >
        <Button>
          <i
            data-value={color}
            data-message={readMessage('messages.notifs.color')}
            style={{ color: generateComplementeryColor(color) }}
            className='fa-solid fa-clipboard fa-2xl text-white transition-all duration-300 cursor-pointer'
          />
        </Button>
      </div>
      <span className='font-medium -mt-1'>{color}</span>
    </div>
  );
};

export default ColorCard;

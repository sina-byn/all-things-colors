import { FC } from 'react';

// * components
import Button from './Button';
import Card from './Card';

// * utils
import { generateComplementeryColor } from '../utils/color-generation';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
interface ColorCardProps {
  color: string;
  header?: string;
  className?: string;
}

const ColorCard: FC<ColorCardProps> = ({
  header,
  color,
  className,
}) => {
  return (
    <Card>
      {header !== undefined && (
        <span className='bg-zinc-600 text-gray-200 px-3 pb-0.5 rounded-md'>
          {header}
        </span>
      )}
      <div
        style={{ background: color }}
        className={`
          card-body flex items-center justify-center
          shadow-md aspect-square
          ${className || 'w-full'}
        `}
      >
        <Button>
          <i
            data-value={color}
            data-message={readMessage('messages.notifs.color')}
            style={{ color: generateComplementeryColor(color) }}
            className='fa-solid fa-clipboard text-2xl lg:text-3xl transition-all duration-300 cursor-pointer'
          />
        </Button>
      </div>
      <span className='font-medium -mt-1'>{color}</span>
    </Card>
  );
};

export default ColorCard;

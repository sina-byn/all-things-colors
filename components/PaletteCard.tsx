import { Dispatch, FC, SetStateAction } from 'react';

// * components
import Button from './Button';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
import { Palette } from '../utils/interfaces';
import Card from './Card';
import { generateComplementeryColor } from '../utils/color-generation';

interface PaletteCardProps {
  idx: number;
  color: string;
  locked: boolean;
  setPalette: Dispatch<SetStateAction<Palette>>;
}

const PaletteCard: FC<PaletteCardProps> = ({
  idx,
  color,
  locked,
  setPalette,
}) => {
  const lockHandler = () => {
    setPalette(prevPalette => {
      prevPalette[idx].locked = !locked;
      return prevPalette.slice();
    });
  };

  return (
    <Card className='palette-card'>
      <div
        style={{ background: color, color: generateComplementeryColor(color) }}
        className={`
        card-body w-full md:min-w-[100px] flex items-center justify-center
        aspect-square gap-x-3
        ${idx === 0 ? 'md:rounded-l-lg' : ''}
        ${idx === 5 ? 'md:rounded-r-lg' : ''}
        `}
      >
        <Button>
          <i
            data-value={color}
            data-message={readMessage('messages.notifs.color')}
            className='fa-solid fa-clipboard transition-all duration-300 text-2xl'
          />
        </Button>
        <i
          onClick={lockHandler}
          className={`
            fa-solid text-2xl cursor-pointer transition-all duration-300
            ${locked ? 'fa-lock' : 'fa-lock-open'}
          `}
        />
      </div>
      <span className='text-center font-medium'>{color}</span>
    </Card>
  );
};

export default PaletteCard;

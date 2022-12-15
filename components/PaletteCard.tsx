import { Dispatch, FC, SetStateAction } from 'react';

// * utils
import { copyToClipboard } from '../utils/functions';

// * interfaces
import { Palette } from '../utils/functions';
import Button from './Button';

interface PaletteCardProps {
  idx: number;
  color: string;
  locked: boolean;
  setPalette: Dispatch<SetStateAction<Palette>>;
}

const PaletteCard: FC<PaletteCardProps> = ({ idx, color, locked, setPalette }) => {
  const lockHandler = () => {
    setPalette(prevPalette => {
        prevPalette[idx].locked = !locked;
        return prevPalette.slice();
    });
  };

  return (
    <div className='card-container flex flex-col gap-y-1'>
      <div
        style={{ background: color }}
        className={`
            palette-card min-w-[100px] flex items-center justify-center aspect-square
            ${idx === 0 ? 'rounded-l-lg' : ''}
            ${idx === 4 ? 'rounded-r-lg' : ''}
        `}
      >
        <i
          onClick={lockHandler}
          className={`
            fa-solid fa-xl text-white cursor-pointer transition-all duration-100 active:scale-90
            ${locked ? 'fa-lock' : 'fa-lock-open'}
          `}
        />
      </div>
      <Button
        data-value={color}
        className='font-medium'
        onClick={copyToClipboard}
      >
        {color}
      </Button>
    </div>
  );
};

export default PaletteCard;

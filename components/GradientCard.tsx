import { FC, useEffect, useRef, useState, ReactNode } from 'react';

// * components
import Button from './Button';
import Card from './Card';

// * utils
import {
  generateGradientCssString,
  generateRandomGradientStops,
} from '../utils/gradient-generation';

// * messages
import readMessage from '../data/readMessage';

// * interfaces
interface GradientCardProps {
  id: number | string;
  stops: string[];
  children: ReactNode;
  styleTagId: string;
  coverClassName?: string;
}

interface StaticGradientCardProps {
  id: number;
  stops: string[];
}

const GradientCard: FC<GradientCardProps> = ({
  id,
  stops,
  children,
  coverClassName,
  styleTagId,
}) => {
  const styleInjected = useRef<boolean>(false);

  useEffect(() => {
    if (styleInjected.current && !styleTagId.includes('random')) return;

    const styleTag = document.querySelector(`style#${styleTagId}`)!;
    styleInjected.current = true;

    if (styleTagId === 'gradients-styles') {
      styleTag.textContent += `
            .gradient-${id} {
                background: linear-gradient(to bottom right, ${stops.join(
                  ' ,'
                )});
            }
        `;
      return;
    }

    styleTag.textContent = `
        .gradient-${id} {
            background: linear-gradient(to bottom right, ${stops.join(' ,')});
        }
    `;
  }, [stops]);

  return (
    <Card
      className={`gradient-${id} aspect-square rounded-2xl overflow-hidden shadow-lg`}
    >
      <div
        className={`
          card-cover flex flex-col items-center justify-center w-full h-full gap-y-2 relative ${coverClassName}
          `}
      >
        <Button>
          <i
            data-value={generateGradientCssString(stops)}
            data-message={'Gradient Code Copied to Clipboard'}
            className='fa-solid fa-clipboard fa-xl text-white absolute top-6 right-3 cursor-pointer transition-all duration-300 active:scale-90'
          />
        </Button>
        {children}
      </div>
    </Card>
  );
};

const StaticGradientCard: FC<StaticGradientCardProps> = ({ id, stops }) => {
  return (
    <GradientCard
      id={id}
      stops={stops}
      coverClassName='opacity-0 hover:opacity-100 transition-all duration-300 bg-black/60'
      styleTagId='gradients-styles'
    >
      {stops.map((stop, idx) => (
        <Button
          key={idx}
          data-value={stop}
          data-message={readMessage('messages.notifs.color')}
          className='w-full text-sm md:text-base max-w-[120px] text-gray-200 border-2 border-gray-200 rounded-lg py-1 hover:bg-gray-200/50'
        >
          {stop}
        </Button>
      ))}
    </GradientCard>
  );
};

const RandomGradientCard: FC = () => {
  const [stops, setStops] = useState<string[]>(['#dc4887', '#5b36e8']);

  return (
    <GradientCard id='random' stops={stops} styleTagId='random-gradient-styles'>
      <Button
        onClick={() => setStops(generateRandomGradientStops())}
        className='sm:w-10/12 w-9/12 max-w-[240px] text-gray-200 border-2 border-gray-200 py-1 hover:bg-gray-200/50 pb-1.5'
      >
        randomize
      </Button>
      <div className='random-stops sm:w-10/12 w-9/12 grid grid-cols-2 justify-items-center w-full max-w-[240px] gap-x-2'>
        {stops.map((stop, idx) => (
          <Button
            key={idx}
            data-value={stop}
            data-message={readMessage('messages.notifs.color')}
            className='w-full text-gray-200 border-2 border-gray-200 py-1 hover:bg-gray-200/50'
          >
            {stop}
          </Button>
        ))}
      </div>
    </GradientCard>
  );
};

export default { Static: StaticGradientCard, Random: RandomGradientCard };

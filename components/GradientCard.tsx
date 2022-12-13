import { FC, MouseEvent, useEffect, useRef } from 'react';

// * components
import Button from './Button';

// * utils
import { copyToClipboard, generateGradientCssString } from '../utils/functions';

interface StaticGradientCardProps {
  id: number;
  stops: string[];
}

const StaticGradientCard: FC<StaticGradientCardProps> = ({ id, stops }) => {
  const styleInjected = useRef<boolean>(false);
  const copyHandler = (e: MouseEvent) => {
    const button = e.target as HTMLElement;
    copyToClipboard(button.dataset.value!);
  };

  useEffect(() => {
    const styleTag = document.querySelector('style.gradients-styles')!;

    if (styleInjected.current) return;

    styleInjected.current = true;

    styleTag.textContent += `
        .gradient-${id} {
            background: linear-gradient(to bottom right, ${stops.join(' ,')});
        }
    `;
  }, []);

  return (
    <div className={`gradient-${id} aspect-square rounded-2xl overflow-hidden`}>
      <div
        className={`
        card-cover w-full h-full flex flex-col items-center justify-center gap-y-2
        relative opacity-0 hover:opacity-100 transition-all duration-300 bg-black/60
      `}
      >
        <i
          onClick={copyHandler}
          data-value={generateGradientCssString(stops)}
          className='fa-solid fa-clipboard fa-xl text-white absolute top-6 right-3 cursor-pointer transition-all duration-300 active:scale-90'
        />
        {stops.map((stop, idx) => (
          <Button
            key={idx}
            onClick={copyHandler}
            data-value={stop}
            className='w-full max-w-[120px] text-gray-200 border-2 border-gray-200 rounded-lg py-1 hover:bg-gray-200/50'
          >
            {stop}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default { Static: StaticGradientCard, Random: null };

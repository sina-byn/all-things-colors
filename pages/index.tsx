import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

// * components
import Navbar from '../components/Navbar';
import SectionHeader from '../components/SectionHeader';
import GradientCard from '../components/GradientCard';
import ColorCard from '../components/ColorCard';
import ColorInput from '../components/ColorInput';
import Button from '../components/Button';
import PaletteCard from '../components/PaletteCard';
import ImageInput from '../components/ImageInput';
import RangeInput from '../components/RangeInput';
import LoadMore from '../components/LoadMore';
const ToastNotification = dynamic(
  () => import('../components/ToastNotification'),
  { ssr: false }
);

// * context
import { AppCtx } from '../context/AppContextProvider';

// * utils
import {
  generatePalette,
  generatePaletteFromColor,
} from '../utils/palette-generation';
import { hexToRgb, toHexString } from '../utils/color-conversion';
import { generateMixedColor } from '../utils/color-generation';

// * data
import GRADIENTS_DATA from '../data/gradients.json';

// * interfaces
import { RgbObject, ImagePalette, Palette, MixData } from '../utils/interfaces';

const Home: NextPage = () => {
  const { notifs } = useContext(AppCtx)!;

  const [gradients, setGradients] = useState<any>(GRADIENTS_DATA.slice(0, 7));
  const [baseColor, setBaseColor] = useState<string>('#ff4500');
  const [plaette, setPalette] = useState<Palette>([]);
  const [imagePalette, setImagePalette] = useState<ImagePalette>({
    mainColors: [],
    complementaryColors: [],
  });
  const [mixData, setMixData] = useState<MixData>({
    mixedColor: '',
    color_1: '#ff4500',
    color_2: '#8cddd1',
    ratio: 50,
  });

  useEffect(() => {
    generatePalette(setPalette);
  }, []);

  useEffect(() => {
    setMixData(prev => ({
      ...prev,
      mixedColor: generateMixedColor(prev),
    }));
  }, [mixData.color_1, mixData.color_2, mixData.ratio]);

  return (
    <>
      <header className='h-[50px] sticky top-0 z-50 bg-gray-100 py-3 shadow-lg'>
        <div className='header-content max-w-[1440px] flex items-center justify-between px-2 xs:px-6 -mt-0.5 mx-auto'>
          <h1 className='text-2xl font-bold overflow-hidden'>
            <span className='text-orange-red'>A</span>ll&nbsp;
            <span className='text-orange-red'>T</span>hings&nbsp;
            <span className='text-orange-red'>C</span>olors
          </h1>
          <Navbar />
        </div>
      </header>
      <main className='max-w-[1440px] px-2 xs:px-6 mx-auto'>
        <SectionHeader title='Gradients' />
        <section className='gradients-section grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mb-6'>
          <GradientCard.Random />
          {gradients &&
            gradients.map((gradient: any) => (
              <GradientCard.Static
                id={gradient.id}
                key={gradient.id}
                stops={gradient.stops}
              />
            ))}
        </section>
        <LoadMore
          initialLength={7}
          data={GRADIENTS_DATA}
          setData={setGradients}
        />
        <SectionHeader title='Tints and Shades' />
        <section className='tints-and-shades-section mb-16'>
          <ColorInput value={baseColor} setValue={setBaseColor} />
          <section className='tints-section grid grid-cols-4 xs:grid-cols-6 lg:grid-cols-11 gap-y-5 mb-10'>
            {generatePaletteFromColor('tint', hexToRgb(baseColor)).map(
              (tint, idx) => (
                <ColorCard
                  key={idx}
                  header={idx * 10 + '%'}
                  color={toHexString(tint as RgbObject)}
                />
              )
            )}
          </section>
          <section className='shades-section grid grid-cols-4 xs:grid-cols-6 lg:grid-cols-11 gap-y-5'>
            {generatePaletteFromColor('shade', hexToRgb(baseColor)).map(
              (shade, idx) => (
                <ColorCard
                  key={idx}
                  header={idx * 10 + '%'}
                  color={toHexString(shade as RgbObject)}
                />
              )
            )}
          </section>
        </section>
        <SectionHeader title='Color Palette' />
        <section className='color-palette-section mb-16'>
          <section className='color-palette md:w-fit grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-y-4 mx-auto'>
            {plaette.map((plaetteColor, idx) => (
              <PaletteCard
                key={idx}
                idx={idx}
                color={plaetteColor.color}
                locked={plaetteColor.locked}
                setPalette={setPalette}
              />
            ))}
          </section>
          <Button
            onClick={() => generatePalette(setPalette)}
            className='block border-2 border-zinc-700 px-2 pt-1 pb-1.5 rounded-md mx-auto mt-5'
          >
            randomize palette
          </Button>
        </section>
        <SectionHeader title='Image Palette' />
        <section className='image-color-palette-section mb-16'>
          <ImageInput setImagePalette={setImagePalette} />
          <section className='image-palette flex flex-col gap-x-16 mt-10'>
            {imagePalette.mainColors.length > 0 && (
              <>
                <h4 className='text-xl font-medium my-4'>Main Colors</h4>
                <div className='main-palette grid grid-cols-4 md:grid-cols-8 gap-y-4'>
                  {imagePalette.mainColors.map(color => (
                    <ColorCard key={color} color={color} />
                  ))}
                </div>
              </>
            )}
            {imagePalette.complementaryColors.length > 0 && (
              <>
                <h4 className='text-xl font-medium mt-10 mb-4'>
                  Complementary Colors
                </h4>
                <div className='complementary-palette grid grid-cols-4 md:grid-cols-8 gap-y-4'>
                  {imagePalette.complementaryColors.map(color => (
                    <ColorCard key={color} color={color} />
                  ))}
                </div>
              </>
            )}
          </section>
        </section>
        <SectionHeader title='Color Mixer' />
        <section className='color-mixer-section grid grid-cols-2 xs:grid-cols-3 justify-items-center items-center mb-16 mx-auto'>
          <ColorInput
            value={mixData.color_1}
            setValue={value =>
              setMixData(prev => ({ ...prev, color_1: value } as MixData))
            }
          />
          <ColorInput
            value={mixData.color_2}
            setValue={value =>
              setMixData(prev => ({ ...prev, color_2: value } as MixData))
            }
          />
          <RangeInput
            title='Ratio'
            value={mixData.ratio}
            setValue={(value: string) =>
              setMixData(prev => ({ ...prev, ratio: +value } as MixData))
            }
          />
          {mixData.mixedColor.length > 0 && (
            <ColorCard
              color={mixData.mixedColor}
              className='w-[80px] rounded-md mt-5 aspect-square'
            />
          )}
        </section>
        {notifs &&
          notifs.map((notif, idx) => (
            <ToastNotification key={idx} message={notif} />
          ))}
      </main>
    </>
  );
};

export default Home;

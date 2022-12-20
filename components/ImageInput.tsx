import dynamic from 'next/dynamic';
import {
  FC,
  useRef,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  DragEvent,
} from 'react';

// * components
const EyeDropper = dynamic(() => import('../components/EyeDropper'), {
  ssr: false,
});

// * utils
import { parsePixelsData } from '../utils/functions';
import { toHexString } from '../utils/color-conversion';
import {
  generateComplementeryPalette,
  quantization,
} from '../utils/palette-generation';

// * interfaces
import type { ImagePalette } from '../utils/interfaces';

interface ImageInputProps {
  setImagePalette: Dispatch<SetStateAction<ImagePalette>>;
}

const activeDropZoneClassName = [
  'after:content-[""]',
  'after:w-full',
  'after:h-full',
  'after:bg-black/60',
  'after:absolute',
  'after:inset-0',
  'after:rounded-md',
];

const ImageInput: FC<ImageInputProps> = ({ setImagePalette }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropZoneRef = useRef<HTMLElement>(null);

  const imageInputHandler = (file: File) => {
    const imageEl = imageRef.current;
    const canvas = canvasRef.current;

    if (!file || !imageEl || !canvas) return;

    setLoading(true);

    imageEl.src = '';
    imageEl.src = URL.createObjectURL(file);

    const imageLoadHandler = (e: Event) => {
      const loadedImage = e.target as HTMLImageElement;

      canvas.width = loadedImage.width;
      canvas.height = loadedImage.height;

      const ctx = canvas.getContext('2d', {
        willReadFrequently: true,
      })! as CanvasRenderingContext2D;
      ctx.drawImage(imageEl, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const rgbValues = parsePixelsData(imageData);
      const colors = Array.from(
        new Set(quantization(rgbValues).map(color => toHexString(color)))
      );

      const complementaryColors = generateComplementeryPalette(colors);

      const timeout = setTimeout(() => {
        setLoading(false);
        setImagePalette({
          mainColors: colors,
          complementaryColors: complementaryColors,
        });
        clearTimeout(timeout);
      }, 1500);
    };

    imageEl.addEventListener('load', imageLoadHandler);
  };

  const changeHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    const file = input.files![0];
    imageInputHandler(file);
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    dropZoneRef.current!.classList.remove(...activeDropZoneClassName);
    dropZoneRef.current!.classList.add('border-dashed');
    const file = e.dataTransfer.files[0];
    const fileType = file.type.split('/');
    if (
      fileType[0] === 'image' &&
      ['jpg', 'jpeg', 'jfif', 'png', 'webp'].includes(fileType[1])
    )
      imageInputHandler(file);
  };

  const dragCancelHandler = () => {
    dropZoneRef.current!.classList.remove(...activeDropZoneClassName);
    dropZoneRef.current!.classList.add('border-dashed');
  };

  const dragOverHandler = (e: DragEvent) => {
    e.preventDefault();
    dropZoneRef.current!.classList.add(...activeDropZoneClassName);
    dropZoneRef.current!.classList.remove('border-dashed');
  };

  return (
    <div className='grid md:grid-cols-2 md:grid-rows-3 lg:grid-rows-2 gap-5'>
      <div
        className={`
            image-container flex items-center justify-center
            bg-gray-300 aspect-square overflow-hidden relative
            row-span-3 lg:row-span-2
            ${
              loading
                ? `before:content-[''] before:absolute 
                   before:w-full before:h-full before:bg-black/60 before:z-20
                   after:content-[''] after:absolute after:w-20
                   after:h-20 after:border-t-blue-500 after:border-8
                   after:rounded-full after:animate-spin after:z-30`
                : ''
            }
        `}
      >
        <img ref={imageRef} className='max-w-full max-h-full' />
      </div>
      <canvas ref={canvasRef} className='hidden' />
      <section
        ref={dropZoneRef}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragEnd={dragCancelHandler}
        onDragLeave={dragCancelHandler}
        className={`
          drop-zone flex flex-col items-center justify-center gap-y-4 text-zinc-700
          border-4 border-zinc-700 border-dashed rounded-lg relative overflow-hidden
          row-start-1 md:row-start-auto row-span-2 lg:row-span-1 py-10
        `}
      >
        <i className='fa-solid fa-cloud-arrow-up text-5xl lg:text-6xl' />
        <span className='font-medium text-lg text-center px-4'>
          Drag and Drop an image or
        </span>
        <small className='font-medium text-center px-4 -mt-4'>
          &#40;.jpg, .png, .webp&#41;
        </small>
        <label
          htmlFor='image-input'
          className='border-zinc-700 border-2 text-sm font-medium px-2 py-1 rounded-md cursor-pointer'
        >
          Browse Images
          <input
            type='file'
            id='image-input'
            onChange={changeHandler}
            accept='.jpg,.jpeg,.jfif,.png,.webp'
            className='hidden'
          />
        </label>
      </section>
      <EyeDropper />
    </div>
  );
};

export default ImageInput;

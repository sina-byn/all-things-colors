// * utils
import { hexToRgb, rgbToHex } from './color-conversion';

// * interfaces
import type { RgbObject } from './interfaces';

const generateRandomHexChunk = () => {
  const chunk = Math.floor(Math.random() * 256).toString(16);

  return chunk.length === 2 ? chunk : '0' + chunk;
};

const generateRandomHex = () => {
  return (
    '#' +
    generateRandomHexChunk() +
    generateRandomHexChunk() +
    generateRandomHexChunk()
  );
};

const generateTint = (rgbObj: RgbObject, factor: number) => {
  return Object.entries(rgbObj).reduce(
    (tintObj: Partial<RgbObject>, [comp, value]) => {
      // @ts-ignore
      tintObj[comp] = Math.round(value + (255 - value) * factor);
      return tintObj;
    },
    {}
  );
};

const generateShade = (rgbObj: RgbObject, factor: number) => {
  return Object.entries(rgbObj).reduce(
    (shadeObj: Partial<RgbObject>, [comp, value]) => {
      // @ts-ignore
      shadeObj[comp] = Math.round(value * factor);
      return shadeObj;
    },
    {}
  );
};

const generateComplementeryColor = (hex: string) => {
  const rgbObj = hexToRgb(hex);
  return rgbToHex(
    Object.entries(rgbObj).reduce((prev, [comp, value]) => {
      // @ts-ignore
      prev[comp] = 255 - value;
      return prev;
    }, {} as RgbObject)
  );
};

export {
  generateTint,
  generateShade,
  generateRandomHex,
  generateComplementeryColor
};

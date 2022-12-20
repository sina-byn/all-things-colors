// * utils
import { hexToRgb, rgbToHex } from './color-conversion';

// * interfaces
import type { RgbObject, MixData } from './interfaces';

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


const generateMixedColor = (data: MixData) => {
  const { color_1, color_2, ratio } = data;
  const {r: r_1, g: g_1, b: b_1} = hexToRgb(color_1);
  const {r: r_2, g: g_2, b: b_2} = hexToRgb(color_2);

  const mixedColor = {
    r: Math.round(((r_2 - r_1) * ratio / 100) + r_1),
    g: Math.round(((g_2 - g_1) * ratio / 100) + g_1),
    b: Math.round(((b_2 - b_1) * ratio / 100) + b_1)
  };

  return rgbToHex(mixedColor);
};

export {
  generateTint,
  generateShade,
  generateRandomHex,
  generateMixedColor,
  generateComplementeryColor
};

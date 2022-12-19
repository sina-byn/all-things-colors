import { Dispatch, SetStateAction } from 'react';

// * utils
import { findBiggestRangeComp } from './functions';
import {
  generateTint,
  generateShade,
  generateRandomHex,
  generateComplementeryColor,
} from './color-generation';

// * interfaces
import type { RgbObject, Palette } from './interfaces';

const generatePaletteFromColor = (
  type: 'shade' | 'tint',
  rgbObj: RgbObject
) => {
  const colors = [];

  for (let i = 0; i <= 1; i += 0.1) {
    switch (type) {
      case 'shade':
        colors.push(generateShade(rgbObj, 1 - i));
        break;
      default:
        colors.push(generateTint(rgbObj, i));
    }
  }

  return colors;
};

const generatePalette = (setPalette: Dispatch<SetStateAction<Palette>>) => {
  setPalette(prevPalette => {
    if (prevPalette.length === 0) {
      for (let i = 0; i < 6; i++) {
        prevPalette[i] = { color: generateRandomHex(), locked: false };
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (prevPalette[i].locked) continue;
        prevPalette[i].color = generateRandomHex();
      }
    }

    return prevPalette.slice();
  });
};

const quantization = (
  rgbValues: RgbObject[],
  depth: number = 0
): RgbObject[] => {
  const MAX_DEPTH = 3;
  const length = rgbValues.length;

  if (depth === MAX_DEPTH || length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;
        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / length);
    color.g = Math.round(color.g / length);
    color.b = Math.round(color.b / length);

    return [color];
  }

  const baseComp = findBiggestRangeComp(rgbValues);
  rgbValues.sort((a, b) => a[baseComp] - b[baseComp]);

  const mid = length / 2;

  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

const generateComplementeryPalette = (colors: string[]) => {
  return colors.map(color => generateComplementeryColor(color));
};

export {
  quantization,
  generatePalette,
  generatePaletteFromColor,
  generateComplementeryPalette,
};

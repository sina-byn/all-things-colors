import { MouseEvent } from 'react';

// * interfaces
import type { RgbObject } from './interfaces';

const copyToClipboard = (e: MouseEvent) => {
  if (!('clipboard' in navigator)) return;

  const button = e.target as HTMLElement;
  const value = button.dataset.value!;

  navigator.clipboard
    .writeText(value)
    .then(() => null)
    .catch(err => console.error(err));
};

const parsePixelsData = (imageData: ImageData) => {
  const { data } = imageData;
  const rbgValues: RgbObject[] = [];
  const dataLength = data.length;

  for (let i = 0; i < dataLength; i += 4) {
    rbgValues.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
    });
  }

  return rbgValues;
};

const findBiggestRangeComp = (rgbValues: RgbObject[]) => {
  let minR = Number.MAX_VALUE;
  let minG = Number.MAX_VALUE;
  let minB = Number.MAX_VALUE;

  let maxR = Number.MIN_VALUE;
  let maxG = Number.MIN_VALUE;
  let maxB = Number.MIN_VALUE;

  rgbValues.forEach(({ r, g, b }) => {
    minR = Math.min(minR, r);
    minG = Math.min(minG, g);
    minB = Math.min(minB, b);

    maxR = Math.max(maxR, r);
    maxG = Math.max(maxG, g);
    maxB = Math.min(maxB, b);
  });

  const rangeR = maxR - minR;
  const rangeG = maxG - minG;
  const rangeB = maxB - minB;

  const biggestRange = Math.max(rangeR, rangeG, rangeB);

  switch (biggestRange) {
    case rangeR:
      return 'r';
    case rangeG:
      return 'g';
    default:
      return 'b';
  }
};

export {
  parsePixelsData,
  copyToClipboard,
  findBiggestRangeComp,
};

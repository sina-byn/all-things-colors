import { Dispatch, MouseEvent, SetStateAction } from 'react';

// * interfaces
export interface RgbObject {
  r: number;
  g: number;
  b: number;
}

interface PaletteColor {
  color: string;
  locked: boolean;
}

export type Palette = PaletteColor[];

const copyToClipboard = (e: MouseEvent) => {
  if (!('clipboard' in navigator)) return;

  const button = e.target as HTMLElement;
  const value = button.dataset.value!;

  navigator.clipboard
    .writeText(value)
    .then(() => null)
    .catch(err => console.error(err));
};

const generateGradientCssString = (stops: string[]) => {
  const generateWebkitGradient = (stops: string[]) => {
    let gradientString = '';

    stops.forEach((stop, idx) => {
      switch (idx) {
        case 0:
          gradientString += `from(${stop}), `;
          break;
        case stops.length - 1:
          gradientString += `to(${stop})`;
          break;
        default:
          gradientString += `color-stop(${stop})`;
      }
    });

    return gradientString;
  };
  const backup = `background-color: ${stops[0]};`;
  const operaCss = `background: -o-linear-gradient(to bottom right, ${stops.join(
    ', '
  )});`;
  const webkitCss = `background: -webkit-gradient(linear, left top, right bottom, ${generateWebkitGradient(
    stops
  )});`;
  const normalCss = `background: linear-gradient(to bottom right, ${stops.join(
    ', '
  )});`;

  return `\r\t${backup}\n\t${operaCss}\n\t${webkitCss}\n\t${normalCss}`;
};

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

const generateRandomGradientStops = () => {
  const stopsCount = 2;
  const stops = [];

  for (let i = 0; i < stopsCount; i++) {
    stops.push(generateRandomHex());
  }

  return stops;
};

const hexToRgb = (hex: string) => {
  const comp_1 = parseInt(hex.slice(1, 3), 16);
  const comp_2 = parseInt(hex.slice(3, 5), 16);
  const comp_3 = parseInt(hex.slice(5), 16);

  return {
    r: comp_1,
    g: comp_2,
    b: comp_3,
  };
};

const toHexString = (rgbObj: RgbObject) =>
  `#${Object.values(rgbObj).reduce((prev, curr) => {
    const comp = curr.toString(16);
    return (prev += comp.length === 2 ? comp : '0' + comp);
  }, '')}`;

const toRgbString = (rgbObj: RgbObject) =>
  `rgb(${Object.values(rgbObj).join(', ')})`;

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
      for (let i = 0; i < 5; i++) {
        prevPalette[i] = { color: generateRandomHex(), locked: false };
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (prevPalette[i].locked) continue;
        prevPalette[i].color = generateRandomHex();
      }
    }

    return prevPalette.slice();
  });
};

export {
  hexToRgb,
  toHexString,
  toRgbString,
  copyToClipboard,
  generatePalette,
  generatePaletteFromColor,
  generateGradientCssString,
  generateRandomGradientStops,
};

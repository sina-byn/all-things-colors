// * intefaces
import type { HslObject, RgbObject } from './interfaces';

const hexToRgb = (hex: string): RgbObject => {
  const comp_1 = parseInt(hex.slice(1, 3), 16);
  const comp_2 = parseInt(hex.slice(3, 5), 16);
  const comp_3 = parseInt(hex.slice(5), 16);

  return {
    r: comp_1,
    g: comp_2,
    b: comp_3,
  };
};

const rgbToHex = (rgbObj: RgbObject) => {
  const { r, g, b } = rgbObj;

  const comp_1 = r.toString(16);
  const comp_2 = g.toString(16);
  const comp_3 = b.toString(16);

  const hexChunks = [
    '#',
    comp_1.length === 2 ? comp_1 : '0' + comp_1,
    comp_2.length === 2 ? comp_2 : '0' + comp_2,
    comp_3.length === 2 ? comp_3 : '0' + comp_3,
  ];

  return hexChunks.join('');
};

const rgbToHsl = (rgbObj: RgbObject) => {
  let { r, g, b } = rgbObj;

  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta !== 0) {
    switch (cmax) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 6;
        break;
      default:
        h = (r - g) / delta + 4;
    }
  }

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return {
    h,
    s,
    l,
  };
};

const hslToRgb = (hsl: HslObject) => {
  let { h, s, l } = hsl;

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return {
    r,
    g,
    b,
  };
};

const toHexString = (rgbObj: RgbObject) =>
  `#${Object.values(rgbObj).reduce((prev, curr) => {
    const comp = curr.toString(16);
    return (prev += comp.length === 2 ? comp : '0' + comp);
  }, '')}`;

const toRgbString = (rgbObj: RgbObject) =>
  `rgb(${Object.values(rgbObj).join(', ')})`;

export { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, toHexString, toRgbString };

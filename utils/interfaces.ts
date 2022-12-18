interface RgbObject {
  r: number;
  g: number;
  b: number;
}

interface HslObject {
  h: number;
  s: number;
  l: number;
}

interface PaletteColor {
  color: string;
  locked: boolean;
}

interface ImagePalette {
  mainColors: string[];
  complementaryColors: string[];
}

interface MixData {
  mixedColor: string;
  color_1: string;
  color_2: string;
  ratio: number;
}

type Palette = PaletteColor[];

export type {
  RgbObject,
  HslObject,
  Palette,
  PaletteColor,
  ImagePalette,
  MixData,
};

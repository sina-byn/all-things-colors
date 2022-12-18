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

type Palette = PaletteColor[];

export type { RgbObject, HslObject, Palette, PaletteColor, ImagePalette };

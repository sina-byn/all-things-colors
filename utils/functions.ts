import { MouseEvent } from 'react';

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
}

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

export {
  copyToClipboard,
  generateGradientCssString,
  generateRandomGradientStops,
};

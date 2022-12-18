// * utils
import { generateRandomHex } from './color-generation';

const generateRandomGradientStops = () => {
  const stopsCount = 2;
  const stops = [];

  for (let i = 0; i < stopsCount; i++) {
    stops.push(generateRandomHex());
  }

  return stops;
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

export { generateGradientCssString, generateRandomGradientStops };

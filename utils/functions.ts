const copyToClipboard = (value: string) => {
    if (!('clipboard' in navigator)) return;

    navigator.clipboard
        .writeText(value)
        .then(() => null)
        .catch(err => console.error(err));
}

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
    const operaCss = `background: -o-linear-gradient(to bottom right, ${stops.join(', ')});`
    const webkitCss = `background: -webkit-gradient(linear, left top, right bottom, ${generateWebkitGradient(stops)})`
    const normalCss = `background: linear-gradient(to bottom right, ${stops.join(', ')});`;

    return `\r\t${operaCss}\n\t${webkitCss}\n\t${normalCss}`;
};

export { copyToClipboard, generateGradientCssString };
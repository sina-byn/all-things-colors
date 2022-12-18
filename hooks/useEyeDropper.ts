import { useState } from "react";

const useEyeDropper = () => {
    const [pickedColor, setPickedColor] = useState<string>('');
    // @ts-ignore
    const isSupported = !!window.EyeDropper;
    
    return {
        isSupported,
        // @ts-ignore
        eyeDropper: isSupported ? new EyeDropper() : null,
        pickedColor,
        setPickedColor
    }
};

export default useEyeDropper;
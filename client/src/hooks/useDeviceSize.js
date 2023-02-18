import { useState, useEffect } from "react";

const useDeviceSize = () => {
    const [deviceSize, setDeviceSize] = useState('');

    useEffect(() => {
        const checkScreenSize = () => {
            setDeviceSize({width: window.innerWidth, height: window.innerHeight});
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return deviceSize
}

export default useDeviceSize;
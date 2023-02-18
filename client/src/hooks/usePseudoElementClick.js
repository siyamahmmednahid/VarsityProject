import { useEffect } from "react";

export default function usePseudoElementClick(ref, func) {
    const checkClickEvent = (e) => {
        if (e.target === ref.current) {
            func()
        }
    }

    useEffect(() => {
        if (ref.current) {
            let element = ref.current
            element.addEventListener('click', checkClickEvent);
            return () => {
                element.removeEventListener('click', checkClickEvent);
            };
        }
    }, [ref.current]);
}
import { useEffect, useCallback, useRef } from "react"

export default function useDebounce(callback, delay, dependencies) {
    const timeoutRef = useRef()
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    useEffect(reset, [...dependencies, reset])
    useEffect(clear, [])
}
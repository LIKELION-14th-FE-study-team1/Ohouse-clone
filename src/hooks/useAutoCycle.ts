import { useCallback, useEffect, useRef, useState } from 'react'

type CycleState = {
    index: number
    previousIndex: number | null
    direction: 1 | -1
    transitionKey: number
}

const duration = 450

export default function useAutoCycle(
    count: number,
    delay: number,
    paused = false,
) {
    const [state, setState] = useState<CycleState>({
        index: 0,
        previousIndex: null,
        direction: 1,
        transitionKey: 0,
    })

    const movingRef = useRef(false)

    const move = useCallback((step: number) => {
        if (count < 2 || step === 0 || movingRef.current) return

        movingRef.current = true

        const direction: 1 | -1 = step > 0 ? 1 : -1

        setState((current) => ({
            index: (current.index + direction + count) % count,
            previousIndex: current.index,
            direction,
            transitionKey: current.transitionKey + 1,
        }))
    }, [count])

    useEffect(() => {
        if (paused || count < 2) return

        const timer = window.setInterval(() => move(1), delay)

        return () => window.clearInterval(timer)
    }, [count, delay, paused, move])

    useEffect(() => {
        if (state.transitionKey === 0) return

        const timer = window.setTimeout(() => {
            setState((current) => ({
                ...current,
                previousIndex: null,
            }))
            movingRef.current = false
        }, duration)

        return () => window.clearTimeout(timer)
    }, [state.transitionKey])

    return {
        ...state,
        duration,
        move,
    }
}
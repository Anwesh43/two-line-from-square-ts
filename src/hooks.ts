import {useState, useEffect, CSSProperties} from 'react'

const delay : number = 20 
const scGap : number = 0.02 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) : number => {
                        if (prev > 1) {
                            setScale(0)
                            clearInterval(interval)
                            setAnimated(false)
                        }
                        return prev + scGap 
                    })
                }, delay)
            } 
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {}
        }
    })
    return {
        w, 
        h
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const size = Math.min(w, h) / 10 
    const x = w / 2 
    const y = h / 2
    const background = 'indigo'
    return {
        parentStyle() : CSSProperties {
            const left = `${x}px`
            const top = `${y}px`
            return {
                position, 
                left, 
                top
            }
        },
        blockStyle() : CSSProperties {
            const top = `${-size / 2}px`
            const left = `${-size / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                top, 
                left, 
                width, 
                height, 
                background 
            }
        },
        lineStyle(j : number) : CSSProperties {
            const top = `${size / 2}px`
            const left = `${-size / 2 + j * size}px`
            const height = `${size * Math.sin(scale * Math.PI)}px`
            const width = `${size / 10}px`
            return {
                position, 
                top, 
                left, 
                height, 
                width, 
                background
            }
        }
    }
} 
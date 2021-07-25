import React from 'react'
import {useStyle} from './hooks'
import withContainer from './withContainer'
interface TLSProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function
}
const TwoLineFromSquare = (props : TLSProps) => {
    const {parentStyle, lineStyle, blockStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {blockStyle()} onClick = {() => props.onClick()}>
            </div>
            {[0, 1].map(i => (<div key = {`line_${i}`} style = {lineStyle(i)}></div>))}
        </div>
    )
}

export default withContainer(TwoLineFromSquare)
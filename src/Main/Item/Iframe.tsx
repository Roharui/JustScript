import React from 'react';
import { ItemType } from 'src/type'

function Iframe(props:{item:ItemType}){
    return <>
        <iframe id="Executer" title="EXECUTER" srcDoc={props.item.script}/>
    </>
}

export default Iframe;
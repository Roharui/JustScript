import React from 'react';

function Iframe(props:{script:string}){
    return <>
        <iframe id="Executer" title="EXECUTER" srcDoc={props.script}/>
    </>
}

export default Iframe;
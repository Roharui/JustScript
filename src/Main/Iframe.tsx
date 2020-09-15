import React from 'react';

function Iframe(props:{script:string}){
    return <>
        <iframe title="EXECUTER" srcDoc={props.script}/>
    </>
}

export default Iframe;
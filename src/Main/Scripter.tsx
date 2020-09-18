import React from 'react';

function Scripter(props:{script:string}){
  return (
    <textarea id="Scripter">{props.script}</textarea>
  );
}

export default Scripter;
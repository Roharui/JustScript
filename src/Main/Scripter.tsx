import React from 'react';
import { ItemType } from './Item';

function Scripter(props:{item:ItemType}){
  return (
    <textarea id="Scripter">{props.item.script}</textarea>
  );
}

export default Scripter;
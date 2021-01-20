import React from 'react';
import { Button } from "@material-ui/core"
import { Content } from './Content'
import { ItemType } from './Item';
import Scripter from './Scripter';

export interface Opertion{
  closer: () => void,
  writer: (script:string) => void,
}

export interface PopupType{
  item: ItemType,
  type: "html" | "canvas" | "tema" | "writer"
  oper: Opertion;
}

export default function Popup(props:PopupType){
  let oper = props.oper;
  let {width, height} = props.type !== "writer" ? props.item : {width:"50%",height:"50%"}
  return (
    <div className='popup'>
      <Button style={{position:"fixed", top:"10px", right:"10px", backgroundColor: "white"}} onClick={oper.closer}>X</Button>
      <div className='popup_inner' style={{width: width, height: height}}>
      {props.type === "writer" ? <Scripter item={props.item} writer={oper.writer}/> : Content(props.item)}
      </div>
    </div>
  );
}
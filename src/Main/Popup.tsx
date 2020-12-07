import React from 'react';
import { Button } from "@material-ui/core"
import { Content } from './Content'
import { ItemType } from './Item';
import Scripter from './Scripter';

export interface Opertion{
  closer:any,
  writer:any,
}
export interface PopupType{
  item: ItemType,
  oper: Opertion;
}

export default function Popup(props:PopupType){
  let oper = props.oper;
  let {width, height} = !oper.writer ? props.item : {width:"50%",height:"50%"}
  return (
    <div className='popup'>
      <Button style={{position:"fixed", top:"10px", right:"10px", backgroundColor: "white"}} onClick={oper.closer}>X</Button>
      <div className='popup_inner' style={{width: width, height: height}}>
      {oper.writer ? <Scripter item={props.item} writer={oper.writer}/> : Content(props.item)}
      </div>
    </div>
  );
}
import React from 'react';
import { Button } from "@material-ui/core"
import { Content } from './Content'
import { ItemType } from './Item/Item';
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
  let {width, height} = props.item
  return (
    <div className='popup'>
      <div className='popup_inner' style={{width: width, height: height}}>
      <Button style={{position:"absolute", top:"10px", right:"10px", backgroundColor: "white"}} onClick={oper.closer}>X</Button>
      {oper.writer ? <Scripter item={props.item} writer={oper.writer}/> : Content(props.item)}
      </div>
    </div>
  );
}
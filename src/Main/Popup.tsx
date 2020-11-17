import React from 'react';
import Iframe from './Item/Iframe'
import Scripter from './Scripter'
import { Button } from "@material-ui/core"
import { ItemType } from './Item/Item';
import Canvas from './Item/Canvas';

export interface Opertion{
  closer:any,
  writer:any,
}
export interface PopupType{
  item: ItemType,
  oper: Opertion;
}

// const tema = <></>;
const canvas = (props:PopupType) => <Canvas item={props.item}/>
const html = (props:PopupType) => <Iframe item={props.item}/>
const writer = (props:PopupType) => <Scripter item={props.item} writer={props.oper.writer}/>

function getPopup(props:PopupType){
  if(props.oper.writer) return writer(props);
  if(props.item.type === 'html') return html(props);
  if(props.item.type === 'canvas' ) return canvas(props)
  return <></>
}

export function Popup(props:PopupType){
  let oper = props.oper;
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px", backgroundColor: "white"}} onClick={oper.closer}>X</Button>
      {getPopup(props)}
      </div>
    </div>
  );
}
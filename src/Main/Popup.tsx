import React from 'react';
import Iframe from './Item/Iframe'
import Scripter from './Scripter'
import { Button } from "@material-ui/core"
import { ItemType } from './Item/Item';

export interface Opertion{
  type: 'tema' | 'canvas' | 'html' | 'writer',
  closer:any,
  writer:any,
}
export interface PopupType{
  item: ItemType,
  oper: Opertion;
}

export function Popup(props:PopupType){
  let oper = props.oper;
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px", backgroundColor: "white"}} onClick={oper.closer}>X</Button>
        {oper.type === 'writer' ?
          <>
           <Scripter item={props.item} writer={oper.writer}/>
          </>
        :
          <>
            <Iframe item={props.item}/>
          </>
        }
      </div>
    </div>
  );
}
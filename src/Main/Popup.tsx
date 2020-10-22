import React from 'react';
import Iframe from './Item/Iframe'
import Scripter from './Scripter'
import { Button } from "@material-ui/core"
import { ItemType } from './Item/Item';

export interface PopupType{
  item: ItemType
  writer: any,
  closer: any
}

export function Popup(props:PopupType){
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px", backgroundColor: "white"}} onClick={props.closer}>X</Button>
        {props.writer ?
          <>
           <Scripter item={props.item} writer={props.writer}/>
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
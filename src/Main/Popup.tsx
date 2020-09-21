import React from 'react';
import Iframe from './Iframe'
import Scripter from './Scripter'
import { Button } from "@material-ui/core"
import { ItemType } from './Item';

export interface PopupType{
  item: ItemType
  writer: any,
  closer: any
}

export function Popup(props:PopupType){
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px"}} onClick={props.closer}>X</Button>
        {props.writer ? <Scripter item={props.item} /> : <Iframe item={props.item}/>}
        {props.writer ? <Button color="primary" style={{position:"absolute", bottom:"10px", left:"10px"}}>Upload</Button>:null}
      </div>
    </div>
  );
}
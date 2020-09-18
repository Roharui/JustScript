import React from 'react';
import Iframe from './Iframe'
import Scripter from './Scripter'
import { Button } from "@material-ui/core"

function Popup(props:{text:string, closePopup: any, writeAble: boolean}){
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px"}} onClick={props.closePopup}>X</Button>
        {props.writeAble ? <Scripter script={props.text} /> : <Iframe script={props.text}/>}
      {props.writeAble?<Button color="primary" style={{position:"absolute", bottom:"10px", left:"10px"}}>Upload</Button>:null}
      </div>
    </div>
  );
}

export default Popup;
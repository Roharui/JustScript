import React from 'react';
import Iframe from './Iframe'
import { Button } from "@material-ui/core"

function Popup(props:{text:string, closePopup: any}){
  return (
    <div className='popup'>
      <div className='popup_inner'>
      <Button style={{position:"absolute", top:"10px", right:"10px"}} onClick={props.closePopup}>X</Button>
      <Iframe script={props.text}/>
      </div>
    </div>
  );
}

export default Popup;
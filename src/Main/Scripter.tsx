import React from 'react';
import { ItemType } from './Item';
import { Button } from "@material-ui/core"

type ScriptInput = {item:ItemType, writer:(script:string) => void}

class Scripter extends React.Component<ScriptInput, ScriptInput> {

  constructor(props:ScriptInput) {
    super(props);
    this.state = {
      item: props.item,
      writer: props.writer
    }
  }

  onEvent = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      item : {...this.state.item, script:e.target.value}
    })
  }

  render(){
    let script = this.state.item.script
    return <>
      <textarea id="Scripter" onChange={this.onEvent} value={this.state.item.script}></textarea>
      <Button color="primary" style={{position:"absolute", bottom:"10px", left:"10px"}} 
        onClick={() => {this.state.writer(script)}}>Upload</Button>
    </>
  }
}

export default Scripter;
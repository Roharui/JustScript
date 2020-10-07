import React from 'react';
import { ItemType } from './Item';
import { Button } from "@material-ui/core"

// function Scripter(props:{item:ItemType, writer:any}){
//   return (
//     <>
//       <textarea id="Scripter">{props.item.script}</textarea>
//       <Button color="primary" style={{position:"absolute", bottom:"10px", left:"10px"}} onClick={props.writer}>Upload</Button>
//     </>
//   );
// }

class Scripter extends React.Component<{item:ItemType, writer:any}, {item:ItemType, writer:any}> {

  constructor(props:{item:ItemType, writer:any}) {
    super(props);
    this.state = {
      item: props.item,
      writer: props.writer
    }
  }

  onEvent = (e:any) => {
    this.setState({
      item : {...this.state.item, script:e.target.value}
    })

  }

  render(){
    return <>
      <textarea id="Scripter" onChange={this.onEvent} value={this.state.item.script}></textarea>
      <Button color="primary" style={{position:"absolute", bottom:"10px", left:"10px"}} 
        onClick={() => {this.state.writer(this.state.item)}}>Upload</Button>
    </>
  }
}

export default Scripter;

import React from 'react';
import DataSender from 'src/lib/DataSender';
import { getInstance, TemaManager } from 'src/lib/TemaManager';

class Tema extends React.Component<any, {temaItem:HTMLDivElement[]}> {
  private ds:DataSender;
  private tm:TemaManager;

  constructor(props:any){
    super(props)
    this.state = {
      temaItem: []
    }
    this.ds = new DataSender()
    this.tm = getInstance()
  }

  componentDidMount(){
    this.ds.record()
    .then(x => {
      this.setState({temaItem: x.map((i:number) => <div>{i}</div>)})
    })
  }

  render() {
    return <>
      <div>
        
        {this.state.temaItem}

      </div>
    </>
  }
}

export default Tema
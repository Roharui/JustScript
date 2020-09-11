import React from 'react';
import Item from './Item'

class Main extends React.Component {
    state:any;

    constructor(props:any) {
        super(props);
        this.state = {
            items : [
                {
                    id : 0,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST",
                    script: "console.log('this is test')"
                },
                {
                    id : 1,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
        ]
      }
  }

  itemMapper = (data:Array<number>) => {
      return data.map(x => {
       return <Item data={x}/>
      })
  }

  render() {
    return <div className="Main">
        {this.itemMapper(this.state.items)}
        <iframe title="JustScript is Awesome" id="justscript_space" className="class"></iframe>
    </div>
  }
}

export default Main;
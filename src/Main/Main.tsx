import React from 'react';
import Item from './Item'

class Main extends React.Component {
    state:any;

    constructor(props:any) {
        super(props);
        this.state = {
            items : [
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                {
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST"
                },
                
        ]
      }
  }

  itemMapper = (data:Array<number>) => {
      return data.map(x => {
       return Item(x) 
      })
  }

  render() {
    return <div className="Main">
        {this.itemMapper(this.state.items)}
    </div>
  }
}

export default Main;
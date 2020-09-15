import React from 'react';
import Item from './Item'
import item from '../types/type'
import Popup from './Popup'

interface MainState {
    items:item[];
    cur_script: string;
    show_popup: boolean;
}

class Main extends React.Component<any, MainState> {

    constructor(props:any) {
        super(props);
        this.state = {
            items : [
                {
                    id : 0,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST",
                    script:"<h1>Hello!!!</h1>"
                },
                {
                    id : 1,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST",
                    script:'console.log("good job")'
                },
            ],
            cur_script: "",
            show_popup: false
        }
    }

    itemMapper = (data:item[]) => {
        return data.map(x => {
            return <Item data={x} sender={this.scriptSender} popup={this.togglePopup.bind(this)}/>
        })
    }

    scriptSender = (script:string) => {
        this.setState({
            cur_script : script
        })
        this.togglePopup()
    }

    togglePopup() {
        this.setState({
          show_popup: !this.state.show_popup
        });
    }

    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            {this.state.show_popup ? 
          <Popup
            text={this.state.cur_script}
            closePopup={this.togglePopup.bind(this)}
          />
          : null}
        </div>
    }
}

export default Main;
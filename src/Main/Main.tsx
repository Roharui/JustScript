import React from 'react';
import {Item, ItemType} from './Item'
import {Popup} from './Popup'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
}

class Main extends React.Component<any, MainState> {

    constructor(props:null) {
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
                    script:'<script>document.write("hello")</script>'
                },
            ],
            cur_script: {
                id : 0,
                img : "Icon.png",
                name : "Twitch",
                descript : "TEST",
                script:"<h1>Hello!!!</h1>"
            },
            wirteAble: false,
            show_popup: false
        }
    }

    itemMapper = (data:ItemType[]) => {
        return data.map(x => {
            return <Item data={x} sender={this.scriptSender} popup={this.memoSender}/>
        })
    }

    scriptSender = (item:ItemType) => {
        this.setState({
            cur_script : item,
            wirteAble: false
        })
        this.togglePopup()
    }

    memoSender = (item:ItemType) => {
        this.setState({
            cur_script : item,
            wirteAble: true
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
                item={this.state.cur_script}
                writer={this.state.wirteAble}
                closer={this.togglePopup.bind(this)}
            />
          : null}
        </div>
    }
}

export default Main;
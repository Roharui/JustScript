
import React from 'react';
import {Item, ItemType} from './Item'
import {Popup} from './Popup'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
    test: number;
}

class Main extends React.Component<any, MainState> {

    constructor(props:null) {
        super(props);
        this.state = {
            items: [],
            cur_script: {id:-1, img:"", name:"", descript:"", script:""},
            wirteAble: false,
            show_popup: false,
            test: 0
        }
        this.update()
    }

    update() {
        fetch(`http://${window.location.hostname}:3001/`)
        .then(res => res.json())
        .then(res => this.setState({items: res}))
    }

    itemMapper = (data:ItemType[]) => {
        return data.map((x, i) => {
            return <Item key={i} data={x} sender={this.scriptSender} popup={this.memoSender}/>
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

    scriptWriter(data:ItemType){
        let index = this.state.items.findIndex(x => x.id === data.id)
        this.setState((oldState) => {
            let newState = {...oldState}; 
            newState.items.splice(index, 1, data);
            return newState;
        })
    }

    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            {this.state.show_popup ?
            <Popup
                item={this.state.cur_script}
                writer={this.state.wirteAble ? this.scriptWriter.bind(this) : false}
                closer={this.togglePopup.bind(this)}
            />
          : null}
        </div>
    }
}

export default Main;
import React from 'react';
import {Item, ItemType} from './Item'
import {Popup} from './Popup'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
}

class MState implements MainState {
    items: ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
    constructor(){
        this.items = []
        this.cur_script = {} as ItemType
        this.wirteAble = false
        this.show_popup = false;
    }
}

class Main extends React.Component<any, MainState> {

    constructor(props:null) {
        super(props);
        this.state = new MState();
    }

    componentDidMount() {
        fetch(`http://${window.location.hostname}:3001/`)
        .then(res => res.json())
        .then(res => this.setState(res))
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
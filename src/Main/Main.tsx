
import React from 'react';
import {Item, ItemType} from './Item/Item'
import Popup, { Opertion } from './Popup'
import DataSender from '../DataSender/DataSender'

import './Main.css'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
}

class Main extends React.Component<any, MainState> {
    private dummy_item : ItemType;
    private ds: DataSender;

    constructor(props:null) {
        super(props);
        this.ds = new DataSender();
        this.dummy_item = {
            id:-1,
            img:"Icon.png", 
            name:"TEST", 
            descript:"TEST", 
            type: "html",
            script:"", 
            score:0, 
            openAble:true,
            width: "50%",
            height: "50%"
        }
        this.state = {
            items: [],
            cur_script: this.dummy_item,
            wirteAble: false,
            show_popup: false
        }
        this.update()
    }

    update() {
        this.ds.getItems()
        .then(res => this.setState({items: res}))
    }

// ===============

    togglePopup() {
        this.setState({
          show_popup: !this.state.show_popup
        });
    }

// ===============

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

    scriptWriter = (data:ItemType) => {
        let id = data.id
        let items = this.state.items.map(el => el.id === id ? data : el)
        this.setState({
            items: []
        }, () => {this.setState({items})})
        this.togglePopup()
    }

    insertWriter = (data:ItemType) => {
        this.ds.insertItem(data)
    }

// ===============


    render() {
        let oper:Opertion = { 
            writer: this.state.wirteAble ? this.scriptWriter : false, 
            closer: this.togglePopup.bind(this) 
        }
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            
            <div className="item"/>
            <div className="item"/>
            <div className="item"/>
            <div className="item"/>

            {this.state.show_popup ?
            <Popup
                item={this.state.cur_script}
                oper={oper} /> : null}
          {/* {this.state.ide_popup ? <Popup item={this.dummy_item} writer={this.insertWriter} closer={this.toggleIde.bind(this)} /> : null} */}
          <button id="add_button" onClick={() => {this.props.history.push('/create')}}>+</button>
        </div>
    }
}

export default Main;
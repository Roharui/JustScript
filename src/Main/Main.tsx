
import React from 'react';
import {Item, ItemType} from './Item/Item'
import {Popup} from './Popup'
import './Main.css'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
    ide_popup : boolean;
}

class Main extends React.Component<any, MainState> {
    private dummy_item : ItemType;

    constructor(props:null) {
        super(props);
        this.dummy_item = {id:-1, img:"Icon.png", name:"TEST", descript:"TEST", script:""}
        this.state = {
            items: [],
            cur_script: this.dummy_item,
            wirteAble: false,
            show_popup: false,
            ide_popup: false
        }
        this.update()
    }

    update() {
        fetch(`http://${window.location.hostname}:3001/`)
        .then(res => res.json())
        .then(res => this.setState({items: res}))
    }

// ===============

    togglePopup() {
        this.setState({
          show_popup: !this.state.show_popup
        });
    }

    toggleIde(){
        this.setState({
            ide_popup: !this.state.ide_popup
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
        console.log(data)
        fetch(`http://${window.location.hostname}:3001/insert`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
        .then(_ => {this.toggleIde()})
        .then(_ => {this.update()})
    }

// ===============


    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            <div  className="item"/>
            <div  className="item"/>
            <div  className="item"/>
            <div  className="item"/>
            {this.state.show_popup ?
            <Popup
                item={this.state.cur_script}
                writer={this.state.wirteAble ? this.scriptWriter : false}
                closer={this.togglePopup.bind(this)}
            />
          : null}
          {this.state.ide_popup ? <Popup item={this.dummy_item} writer={this.insertWriter} closer={this.toggleIde.bind(this)} /> : null}
          <button id="add_button" onClick={this.toggleIde.bind(this)}>+</button>
        </div>
    }
}

export default Main;
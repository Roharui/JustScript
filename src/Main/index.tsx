
import React from 'react';
import {Item, ItemType} from './Item'
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
    private ds: DataSender;

    constructor(props:null) {
        super(props);
        this.ds = new DataSender();
        this.state = {
            items: [],
            cur_script: {} as ItemType,
            wirteAble: false,
            show_popup: false
        }
    }

    componentDidMount(){
        !this.props.recent ? this.update() : this.recentUpdate()
    }

// =============

    update() {
        console.log(5)
        this.ds.getItems(5)
        .then(res => this.setState({items: res.data}))
    }
    
    recentUpdate() {
        this.ds.getItems(0)
        .then(res => this.setState({items: res.data}))
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

            {
                this.state.show_popup 
            ?
                <Popup
                    item={this.state.cur_script}
                    oper={oper} /> 
            : 
                <button id="add_button" onClick={() => {this.props.history.push('/create')}}>+</button>
            }
        </div>
    }
}

export default Main;
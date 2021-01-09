
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Item, ItemType} from './Item'
import Popup, { Opertion } from './Popup'
import DataSender from '../lib/DataSender'
import {LoginCheckerAsString as LoginChecker} from '../lib/LoginChecker';

import './Main.css'

interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
}

type MainProps = RouteComponentProps<any> & {filter:string[]} 

class Main extends React.Component<
    MainProps, MainState> 
{
    private ds: DataSender;

    constructor(props:MainProps) {
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
        this.update()
    }

// =============

    update(){
        let tag = this.props.location.pathname
        switch(tag){
            case "/recent":
                this.recentUpdate()
                break
            case "/itemlist":
                this.ownerUpdate()
                break
            default:
                this._update()
                break
        }
    }

    _update() {
        this.ds.getItems(5, this.props.filter, sessionStorage.getItem("login"))
        .then(res => this.setState({items: res.data}))
    }

    recentUpdate() {
        this.ds.getItems(-5, this.props.filter, sessionStorage.getItem("login"))
        .then(res => this.setState({items: res.data}))
    }

    ownerUpdate() {
        LoginChecker()
        .then((login:string) => {
            this.ds.getOwnItems(login)
            .then(res => this.setState({items : res.data}))
        })
        .catch(err => this.props.history.push("/"))
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
            return <Item 
                key={i} 
                data={x} 
                sender={this.scriptSender} 
                popup={this.memoSender} 
                updater={this.update.bind(this)} 
            />
        })
    }

    scriptSender = (item:ItemType) => {
        this.setState({
            cur_script : item,
            wirteAble: false
        })
        this.togglePopup()
    }

    memoSender = (item:ItemType):void => {
        this.setState({
            cur_script : item,
            wirteAble: true
        })
        this.togglePopup()
    }

    scriptWriter = (data:ItemType):void => {
        let id = data.id
        let items = this.state.items.map(el => el.id === id ? data : el)
        this.setState({
            items: []
        }, () => {this.setState({items})})
        this.togglePopup()
    }

    toCreate = () => {
        this.props.history.push("/create")
    }

// ===============


    render() {
        let oper:Opertion = { 
            writer: this.state.wirteAble ? this.scriptWriter : undefined, 
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
                <button id="add_button" onClick={this.toCreate}>+</button>
            }
        </div>
    }
}

export default withRouter(Main);
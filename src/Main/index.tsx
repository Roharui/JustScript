
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {Item, ItemType} from './Item'
import DataSender from '../lib/DataSender'

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
            case "/search":
                this.searchUpdate()
                break
            default:
                this._update()
                break
        }
    }

    _update() {
        this.ds.getItems(5, this.props.filter)
        .then(res => this.setState({items: res.data}))
    }

    recentUpdate() {
        this.ds.getItems(-5, this.props.filter)
        .then(res => this.setState({items: res.data}))
    }

    ownerUpdate() {
        this.ds.getOwnItems(this.props.filter)
        .then(res => this.setState({items : res.data}))
        .catch(err => this.props.history.push("/"))
    }

    searchUpdate() {
        const param = this.props.location.search.replace("?param=", "")
        this.ds.searchItems(param, this.props.filter)
        .then(res => this.setState({items: res.data}))
    }

// ===============


    itemMapper = (data:ItemType[]) => {
        return data.map((x, i) => {
            return <Item 
                key={i} 
                data={x} 
                updater={this.update.bind(this)} 
            />
        })
    }

    toCreate = () => {
        this.props.history.push("/create")
    }

// ===============


    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            
            <div className="item"/>
            <div className="item"/>
            <div className="item"/>
            <div className="item"/>

            {/* {
                this.state.show_popup 
            ?
                <Popup
                    item={this.state.cur_script}
                    oper={oper} /> 
            :  */}
            
            <Link to="/create"><button id="add_button">+</button></Link>
            
        </div>
    }
}

export default withRouter(Main);
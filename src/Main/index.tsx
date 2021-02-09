
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Item } from './Item'
import DataSender from '../lib/DataSender'

import {ItemType, MainState} from 'src/type'

import './Main.css'

type MainProps = RouteComponentProps<{}> & {
    filter:string[]
} 

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
    
    componentDidUpdate(prev:MainProps){
        if(this.props.location !== prev.location)
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
            case "/report":
                this.reportUpdate()
                break
            default:
                this._update()
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

    reportUpdate() {
        this.ds.reportUpdate()
        .then(res => this.setState({items: res.data}))
        .catch(err => this.props.history.push("/"))
    }

    searchUpdate() {
        const search = new URLSearchParams(this.props.location.search)

        let param:string | null = search.get("param")

        if(!param) {
            param = ""
        } 

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

// ===============


    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}

            {!this.state.items.length ? 
            <div className="no_item">
                <h1>아이템이 존재하지 않습니다.</h1>
            </div>
            : 
            <>
                <div className="item"/>
                <div className="item"/>
                <div className="item"/>
                <div className="item"/>
            </>}
            
            <Link to="/create"><button id="add_button">+</button></Link>
            
        </div>
    }
}

export default withRouter(Main);
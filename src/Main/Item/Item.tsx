import React from 'react';
import { Paper, Button } from "@material-ui/core"
import './Item.css'

export interface ItemType{
    id : number,
    type: 'tema' | 'canvas' | 'html' | 'writer',
    img : string,
    name : string,
    descript: string,
    script: string
}

export class Item extends React.Component<any, ItemType> {
    constructor(props: { data: Readonly<ItemType>; }){
        super(props);
        this.state = props.data;
    }

    render(){
        return <>
            <Paper id={this.state.id.toString()} elevation={3} className="item">
                <div className="recommend">
                    <button className="triangle-up"></button>
                    <h1 style={{width:"30px"}}>0</h1>
                    <button className="triangle-down"></button>
                </div>
                <div className="content">
                    <div className="profile">
                        <img src={this.state.img} width="32" height="32" alt={this.state.name}/>
                        <span className="nick">
                            {this.state.name}
                        </span>
                    </div>
                    <div className="descript">
                        {this.state.descript}
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.props.sender(this.state) }} variant="contained" color="primary">
                            Execute
                        </Button>
                        <Button onClick={() => { this.props.popup(this.state) }} variant="contained" color="secondary">
                            Script
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    }
}
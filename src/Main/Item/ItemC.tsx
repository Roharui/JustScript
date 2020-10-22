import React from 'react';
import { Paper, Button } from "@material-ui/core"
import './Item.css'
import { ItemType } from './Item'

export class ItemC extends React.Component<any, ItemType> {
    constructor(props: { data: Readonly<ItemType>; }){
        super(props);
        this.state = props.data;
    }

    render(){
        return <>
            <Paper id={this.state.id.toString()} elevation={3} style={{float:'left'}} className="item">
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
                    <Button style={{width:"50%"}} onClick={() => { this.props.sender(this.state) }} variant="contained" color="primary">
                        Execute
                    </Button>
                    <Button style={{width:"50%"}} onClick={() => { this.props.popup(this.state) }} variant="contained" color="secondary">
                        Script
                    </Button>
                </div>
            </Paper>
        </>
    }
}
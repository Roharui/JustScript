import React from 'react';
import { Paper, Button } from "@material-ui/core"
import './Item.css'
import item from '../types/type'

class Item extends React.Component<any, item> {
    constructor(props: { data: Readonly<item>; }){
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
                    <Button onClick={() => { this.props.sender(this.state.script) }} variant="contained" color="primary">
                        Execute
                    </Button>
                    <Button variant="contained" color="secondary">
                        Script
                    </Button>
                </div>
            </Paper>
        </>
    }
    
}

export default Item;
import React from 'react';
import { Paper, Button } from "@material-ui/core"
import './Item.css'

export interface ItemType{
    id : number,
    type: 'tema' | 'canvas' | 'html' | 'writer',
    img : string,
    name : string,
    descript: string,
    script: string,
    score : number,
    openAble: boolean,
    width: string,
    height: string
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
                        <h1 style={{width:"30px"}}>{this.state.score}</h1>
                    <button className="triangle-down"></button>
                </div>
                <div className="content">
                    <div className="profile" style={{lineHeight:"32px"}}>
                        <img src={this.state.img} width="32" height="32" alt={this.state.name}/>
                        <div className="nick" style={{height:"32px"}}>
                            {this.state.name}
                        </div>
                    </div>
                    <div className="descript">
                        {this.state.descript}
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.props.sender(this.state) }} variant="contained" color="primary">
                            Execute
                        </Button>
                        { this.state.openAble ?                         
                        <Button onClick={() => { this.props.popup(this.state) }} variant="contained" color="secondary">
                            Script
                        </Button> :
                        <Button onClick={() => { alert("Do Not Have Permission") }} variant="contained" disabled>
                            Script
                        </Button>}

                    </div>
                </div>
            </Paper>
        </>
    }
}
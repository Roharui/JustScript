import React from 'react';
import { Paper, Button } from "@material-ui/core"
import './Item.css'

function Item(props:any) {
    return <>
        <Paper elevation={3} style={{float:'left'}} className="item">
            <div className="profile">
                <img src={props.img} width="32" height="32" alt={props.name}/>
                <span className="nick">
                    {props.name}
                </span>
            </div>
            <div className="descript">
                {props.descript}
            </div>
            <div className="buttons">
                <Button variant="contained" color="primary">
                Execute
                </Button>
                <Button variant="contained" color="secondary">
                Script
                </Button>
            </div>
        </Paper>
    </>
}

export default Item;
import React from 'react';
import { Paper, Button } from "@material-ui/core"
import MenuListComposition from "./itemMenu"
import DataSender from 'src/lib/DataSender';
import {LoginCheckerAsString as LoginChecker} from 'src/lib/LoginChecker';

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
    height: string;
    own: number;
    recommended: number;
}

type ItemProps = {
    key: number;
    data: ItemType;
    sender:Function;
    popup:Function;
    updater:Function;
}

export class Item extends React.Component<Readonly<ItemProps>, any> {
    private ds:DataSender;

    constructor(props:Readonly<ItemProps>) {
        super(props);
        this.ds = new DataSender()
    }

    async delete() {
        let {id} = this.props.data;
        if(window.confirm("정말 삭제하시겠습니까?"))
        {
            let session = await LoginChecker()
            await this.ds.deleteItem(id, session)
            await this.props.updater()
        }
    }
    
    async recommend(flag:number) {
        let {id} = this.props.data;
        let session;
        try{
            session = await LoginChecker()
        } catch(e) {
            alert("로그인이 되어있지 않습니다.")
            return;
        }
        await this.ds.recommend({
            item_id: id,
            session:session,
            flag: flag
        })
        await this.props.updater()
    }

    render(){
        let data = this.props.data;

        let recommend = data.recommended

        let {up, down} = recommend > 0 ? 
        {up:"35px solid orange", down:"35px solid lightgray"} 
        : 
        {up:"35px solid lightgray", down:"35px solid orange"} 
        down = recommend ? down : "35px solid lightgray"

        let src = this.ds.toRealPath(data.img)
        
        return <>
            <Paper id={data.id.toString()} elevation={3} className="item">
                <div className="recommend">
                    <button className="triangle-up" style={{borderBottom:up}}  onClick={()=> this.recommend(1)}></button>
                        <h1 style={{width:"30px"}}>{data.score}</h1>
                    <button className="triangle-down" style={{borderTop:down}} onClick={()=> this.recommend(-1)}></button>
                </div>
                <div className="content">
                    <div className="profile" style={{lineHeight:"32px"}}>
                        <img src={src} width="32" height="32" alt={data.name}/>
                        <div className="nick" style={{height:"32px"}}>
                            {data.name}
                        </div>
                    </div>
                    <div className="descript">
                        {data.descript}
                    </div>
                    <div className="buttons">
                        <Button onClick={() => { this.props.sender(data) }} variant="contained" color="primary">
                            Execute
                        </Button>
                        { data.openAble ?                         
                        <Button onClick={() => { this.props.popup(data) }} variant="contained" color="secondary">
                            Script
                        </Button> :
                        <Button onClick={() => { alert("Do Not Have Permission") }} variant="contained" disabled>
                            Script
                        </Button>}
                    </div>
                    <div style={{position:"absolute", top:"0px", right:"0px"}}>
                        <MenuListComposition delete={this.delete.bind(this)} own={data.own}/>
                    </div>
                </div>
            </Paper>
        </>
    }
}
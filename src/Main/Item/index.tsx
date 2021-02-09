import React from 'react';
import { Paper, Button } from "@material-ui/core"
import DataSender from 'src/lib/DataSender';
import MenuListComposition from "./itemMenu"
import { getInstance, TemaManager } from 'src/lib/TemaManager';
import Popup from '../Popup';
import { ItemProps, ItemType } from 'src/type'

import './Item.css'


type ItemState = {
    popup: boolean;
    type: "html" | "canvas" | "tema" | "writer";
    script? : string;
}

export class Item extends React.Component<Readonly<ItemProps>, ItemState> {
    private ds:DataSender;
    private tm?: TemaManager;

    constructor(props:Readonly<ItemProps>) {
        super(props);
        this.state = {
            popup: false,
            type: this.props.data.type
        }

        this.ds = new DataSender()
        
        if(props.data.type === 'tema')
            this.tm = getInstance();
    }

    // Item Controll

    async delete() {
        let {id} = this.props.data;

        if(window.confirm("정말 삭제하시겠습니까?"))
        {
            await this.ds.deleteItem(id)
            await this.props.updater()
        }
    }
    
    async recommend(flag:number) {
        let {id} = this.props.data;
        await this.ds.recommend({
            item_id: id,
            flag: flag
        })
        await this.props.updater()
    }

    async report(){
        let { id } = this.props.data;
        
        return id
    }

    //===

    scriptWriter = (script:string):void => {
        this.setState({
            script:script
        })
        this.togglePopup()
    }

    togglePopup = () => {
        this.setState({
          popup: !this.state.popup
        });
    }

    getScript():ItemType {
        let item = {...this.props.data}
        item.script = this.state.script || item.script
        return item
    }

    // ===

    rcmBtnClass(recommend:number):{up:string, down:string}{
        let {up, down} = recommend > 0 ? 
        {up:"35px solid orange", down:"35px solid lightgray"} 
        : 
        {up:"35px solid lightgray", down:"35px solid orange"} 
        down = recommend ? down : "35px solid lightgray"

        return {up, down}
    }

    render(){
        let data = this.props.data;
        let {up, down} = this.rcmBtnClass(data.recommended)

        let src = this.ds.toRealPath(data.img)

        const tema = (
            <Button 
            onClick={() => {
                let id =  this.props.data.id
                if(this.tm?.isin(id)) this.tm?.pop(id)
                else this.tm?.push(id)
            }} 
            variant="contained" color={this.tm?.isin(this.props.data.id) ? "default" : "primary"} >
                {this.tm?.isin(this.props.data.id) ? "Cancle" : "Execute"}
            </Button>
        )
        const notTema = (
            <Button onClick={() => { this.setState({type:this.props.data.type}, () => this.togglePopup()) }} variant="contained" color="primary">
                Execute
            </Button>
        )

        const openAble = (<Button onClick={() => { this.setState({type:"writer"}, () => this.togglePopup()) }} variant="contained" color="secondary">Script</Button>)
        const disabled = (<Button onClick={() => { alert("Do Not Have Permission") }} variant="contained" disabled>Script</Button>)
        
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
                            {data.name}@{data.type.toUpperCase()} { this.state.script ? "수정됨" : ""}
                        </div>
                    </div>
                    <div className="descript">
                        {data.descript}
                    </div>
                    <div className="buttons">
                        { data.type === "tema" ? tema : notTema}
                        { data.openAble ? openAble : disabled}
                    </div>
                    <div style={{position:"absolute", top:"0px", right:"0px"}}>
                        <MenuListComposition delete={this.delete.bind(this)} report={this.report.bind(this)} own={data.own}/>
                    </div>
                </div>
            </Paper>
            {
                this.state.popup ? 
                <Popup 
                item={(this.getScript())} 
                type={this.state.type} 
                oper={{closer:this.togglePopup, writer:this.scriptWriter}}/> : null
            }
        </>
    }
}
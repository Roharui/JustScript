
import React, { ChangeEvent } from 'react';
import DataSender from '../DataSender/DataSender'
import { ItemType } from '../Main/Item/Item'
import { Content } from '../Main/Content'
import { Button } from '@material-ui/core';

import './Creater.css'

interface CreaterState{
    session:string | null, 
    item:ItemType
}

class Creater extends React.Component<any, CreaterState> {
    private ds:DataSender;
    private mirror: HTMLTextAreaElement;

    constructor(props:any){
        super(props);
        this.ds = new DataSender();
        this.state = {
            session : null,
            item: {
                id:-1,
                img:"Icon.png", 
                name:"TEST", 
                descript:"TEST",
                type: "html",
                script:"", 
                score:0, 
                openAble:true,
                width: "500px",
                height: "400px"
            }
        }

        this.mirror = {} as HTMLTextAreaElement
    }

    componentDidMount(){
        let login = sessionStorage.getItem("login")
        if(!login) {
            alert("You need to login!")
            this.props.history.push("/")
        }
        this.setState({...this.state, session: login})
    }

    changeEvent = (e:ChangeEvent<HTMLSelectElement>) => {
        let type = e.target.value as "html" | "tema" | "canvas" | "writer"
        let item:ItemType = {...this.state.item, type:type, script:""}
        this.mirror.value = ""
        this.setState({item:item})
    }

    updateScript = () => {
        let item:ItemType = {...this.state.item, script:this.mirror.value}
        this.setState({item:item})
    }

    changeSize = (e:ChangeEvent<HTMLInputElement>) => {
        let item:ItemType = {...this.state.item, [e.target.name]: e.target.value}
        this.setState({item:item})
    }

    render() {
        let item = this.state.item;
        return <>
            <div className="creater">
                <div className="preview">
                    <div className='inner' style={{width: item.width, height: item.height}}>
                        {Content(item)}
                    </div>
                </div>
                <div className="mirror">
                    <div className="controller">
                        <label>
                        width : 
                            <input type="text" id="sizeX" name="width" onChange={this.changeSize} value={item.width}/>
                        </label>
                        <label>
                        height : 
                            <input type="text" id="sizeY" name="height" onChange={this.changeSize} value={item.height}/>
                        </label>
                        <label>
                            Type : 
                            <select className="ItemType" onChange={this.changeEvent}>
                                <option value="html">Html</option>
                                <option value="canvas">Canvas</option>
                                <option value="tema">Tema</option>
                            </select>
                        </label>
                        <Button style={{
                            float: 'right',
                            backgroundColor: "lightblue",
                            width: "100px",
                            height: "40px"
                        }} onClick={this.updateScript}>UPDATE</Button>
                    </div>
                    <textarea ref={(ref:HTMLTextAreaElement) => { this.mirror = ref }} style={{width:"100%", height:"100%"}}></textarea>
                </div>
                <Button style={{
                    position:"absolute", 
                    bottom: "30px", 
                    right: "30px", 
                    backgroundColor: "lightblue",
                    width: "100px",
                    height: "40px"
                }} onClick={() => {}}>UPLOAD</Button>
            </div>
        </>
    }
}

export default Creater;
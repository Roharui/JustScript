
import React, { ChangeEvent } from 'react';
import DataSender from '../DataSender/DataSender'
import { ItemType } from '../Main/Item/Item'
import { Content } from '../Main/Content'
import { Button } from '@material-ui/core';
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';

import './Creater.css'

interface CreaterState{
    session:string, 
    item:ItemType
}

class Creater extends React.Component<any, CreaterState> {
    private ds:DataSender;
    private mirror: string;

    constructor(props:any){
        super(props);
        this.ds = new DataSender();
        this.state = {
            session : "None",
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

        this.mirror = ""
    }

    componentDidMount(){
        let login = sessionStorage.getItem("login")
        if(!login) {
            alert("You need to login!")
            this.props.history.push("/")
        }else{
            this.setState({...this.state, session: login})
        }
    }

    changeEvent = (e:ChangeEvent<HTMLSelectElement>) => {
        let type = e.target.value as "html" | "tema" | "canvas" | "writer"
        let item:ItemType = {...this.state.item, type:type, script:""}
        this.mirror = ""
        this.setState({item:item})
    }

    updateScript = () => {
        let item:ItemType = {...this.state.item, script:this.mirror}
        this.setState({item:item})
    }

    changeSize = (e:ChangeEvent<HTMLInputElement>) => {
        let item:ItemType = {...this.state.item, [e.target.name]: e.target.value}
        this.setState({item:item})
    }

    uploadItem = () => {
        let descript:string | null = prompt("Enter this item's Description")
        if(descript !== null){
            let item:ItemType = {...this.state.item, descript:descript}
            this.ds.insertItem({...this.state, item:item})
            .then(this.props.history.push("/"))
        }
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
                                <option value="html">HTML</option>
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
                    {/* <textarea ref={(ref:HTMLTextAreaElement) => { this.mirror = ref }} style={{width:"100%", height:"100%"}}></textarea> */}
                    <CodeMirror
                        className="code"
                        value={item.script}
                        options={{
                            mode: 'xml',
                            theme: 'material',
                            lineNumbers: true
                        }}
                        onChange={(editor, data, value) => {
                            this.mirror = value
                        }}
                        />
                </div>
                <Button style={{
                    position:"absolute", 
                    bottom: "30px", 
                    right: "30px", 
                    backgroundColor: "lightblue",
                    width: "100px",
                    height: "40px"
                }} onClick={this.uploadItem}>UPLOAD</Button>
            </div>
        </>
    }
}

export default Creater;
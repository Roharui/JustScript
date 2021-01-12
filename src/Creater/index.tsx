
import React, { ChangeEvent } from 'react';
import DataSender from '../lib/DataSender'
import { ItemType } from '../Main/Item'
import { Content } from '../Main/Content'
import { Button } from '@material-ui/core';
import Popup, { Opertion } from 'src/Main/Popup';

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import './Creater.css'

interface CreaterState{
    session:string,
    item:ItemType,
    show_popup:boolean
}


class Creater extends React.Component<any, CreaterState> {
    private ds:DataSender;
    private mirror: string;

    constructor(props:any){
        super(props);
        this.ds = new DataSender();
        this.state = {
            session:"",
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
                height: "400px",
                own: 0,
                recommended:0
            },
            show_popup:false
        }

        this.mirror = ""
    }

    componentDidMount(){
        this.ds.getProfile()
        .catch(x => {
            this.props.history.push("/recent")
        })
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
            .then(() => this.props.history.push("/recent"))
        }
    }

    togglePopup() {
        this.setState({
          show_popup: !this.state.show_popup
        });
    }
    

    render() {
        let item = this.state.item;
        let oper:Opertion = { 
            closer: this.togglePopup.bind(this)
        }
        return <>
            <div className="creater">
                <div className="preview">
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
                            backgroundColor: "lightblue",
                            width: "100px",
                            height: "40px"
                        }} onClick={this.updateScript}>UPDATE</Button>
                        <Button style={{
                            backgroundColor: "lightblue",
                            width: "100px",
                            height: "40px"
                        }} onClick={this.togglePopup.bind(this)}>Show in popup</Button>
                    </div>
                    <div className='inner' style={{width: item.width, height: item.height}}>
                        {Content(item)}
                    </div>
                </div>
                <div className="mirror">
                    {!this.state.show_popup ?
                    <CodeMirror
                    value={this.state.item.script}
                    options={{
                      theme: 'monokai',
                      keyMap: 'sublime',
                      mode: 'html',
                    }}
                    onChange={(e) => {
                        this.mirror = e.getValue();
                    }}
                  /> : null}
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
            {this.state.show_popup ? <Popup item={this.state.item} oper={oper} /> : null}
        </>
    }
}

export default Creater;

import React, { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DataSender from '../lib/DataSender'
import { Content } from '../Main/Content'
import { Button } from '@material-ui/core';
import Popup from 'src/Main/Popup';
import { ItemType, Opertion, CreaterState } from 'src/type'

import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import './Creater.css'

class Creater extends React.Component<RouteComponentProps, CreaterState> {
    private ds:DataSender;
    private mirror: string;

    constructor(props:RouteComponentProps){
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
            alert("로그인이 필요합니다.")
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
            closer: this.togglePopup.bind(this),
            writer: (x:string) => {} 
        }
        return <>
            <div className="creater">
                <div className="preview">
                    <div className="controller">
                        {item.type === "tema" ? null : 
                        <>
                            <label>
                                width:
                                <input type="text" id="sizeX" name="width" onChange={this.changeSize} value={item.width} />
                            </label>
                            <label>
                                height:
                                <input type="text" id="sizeY" name="height" onChange={this.changeSize} value={item.height} />
                            </label>
                        </>
                        }
                            Type:
                            <select className="ItemType" onChange={this.changeEvent}>
                                <option value="html">HTML</option>
                                <option value="canvas">Canvas</option>
                                <option value="tema">Tema</option>
                            </select>
                            <Button style={{
                                backgroundColor: "lightblue",
                                width: "100px",
                                height: "40px"
                            }} onClick={this.updateScript}>UPDATE</Button>
                            {item.type === "tema" ? null : 
                            <Button style={{
                                backgroundColor: "lightblue",
                                width: "100px",
                                height: "40px"
                            }} onClick={this.togglePopup.bind(this)}>Show in popup</Button>
                            }
                    </div>
                    {item.type === "tema" ? 
                        <h1>Tema는 미리보기를 지원하지 않습니다.</h1> 
                    : 
                        <div className='inner' style={{width: item.width, height: item.height}}>
                            {Content(item)}
                        </div>
                    }
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
            {this.state.show_popup ? <Popup item={this.state.item} type={this.state.item.type} oper={oper} /> : null}
        </>
    }
}

export default Creater;
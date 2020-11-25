
import React from 'react';
import DataSender from '../DataSender/DataSender'
// import Canvas from '../Main/Item/Canvas'
import Iframe from '../Main/Item/Iframe'
import { ItemType } from '../Main/Item/Item'
import './Creater.css'

interface CreaterState{
    session:string | null, 
    item:ItemType
}

class Creater extends React.Component<any, CreaterState> {
    private ds:DataSender;

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
                script:"<h1>TEST</h1>", 
                score:0, 
                openAble:true,
                width: "500px",
                height: "400px"
            }
        }
    }

    componentDidMount(){
        let login = sessionStorage.getItem("login")
        if(!login) {
            alert("You need to login!")
            this.props.history.push("/")
        }
        this.setState({...this.state, session: login})
    }

    render() {
        let item = this.state.item;
        return <>
            <div className="creater">
                <div className="controller">
                    <label>
                        SizeX : 
                        <input type="text" id="sizeX" />
                    </label>
                    <label>
                        SizeY : 
                        <input type="text" id="sizeY" />
                    </label>
                </div>
                <div className="preview">
                    <div className='inner' style={{width: item.width, height: item.height}}>
                        <Iframe item={item} />
                    </div>
                </div>
                <div className="mirror">
                    <textarea style={{width:"100%", height:"100%"}}></textarea>
                </div>
            </div>
        </>
    }
}

export default Creater;
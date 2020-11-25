
import React from 'react';
import DataSender from '../DataSender/DataSender'
import Canvas from '../Main/Item/Canvas'
import { ItemType } from '../Main/Item/Item'

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
                script:"", 
                score:0, 
                openAble:true,
                width: "50%",
                height: "50%"
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
        return <>
            <div className="preview">
                <Canvas item={this.state.item} />
            </div>
            <div className="mirror">
                <textarea style={{width:"100%", height:"100%"}}></textarea>
            </div>
        </>
    }
}

export default Creater;
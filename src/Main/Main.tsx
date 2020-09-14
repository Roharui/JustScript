import React from 'react';
import Item from './Item'
import item from '../types/type'
import Iframe from './Iframe'

class Main extends React.Component<any, {items:item[], cur_script:string}> {

    constructor(props:any) {
        super(props);
        this.state = {
            items : [
                {
                    id : 0,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST",
                    script:'console.log("hello")'
                },
                {
                    id : 1,
                    img : "Icon.png",
                    name : "Twitch",
                    descript : "TEST",
                    script:'console.log("good job")'
                },
            ],
            cur_script: ""
        }
    }

    itemMapper = (data:item[]) => {
        return data.map(x => {
            return <Item data={x} sender={this.scriptSender}/>
        })
    }

    scriptSender = (script:string) => {
        this.setState({
            cur_script: `<script>${script}</script>`
        })
    }

    render() {
        return <div className="Main">
            {this.itemMapper(this.state.items)}
            <Iframe script={this.state.cur_script} />
        </div>
    }
}

export default Main;
import React from 'react';
import { ItemType } from '.';

class Canvas extends React.Component<{item:ItemType}, any>{
    private canvas: any;
    private ctx: any;
    private refCaller: (element: HTMLCanvasElement) => void;

    constructor(props:{item:ItemType}){
        super(props);

        this.canvas = null;

        this.refCaller = (element:HTMLCanvasElement) => {
            this.canvas = element
        }
    }

    componentDidMount(){
        this.ctx = this.canvas.getContext("2d");
        console.log(this.props.item.script)
        let func = new Function(this.props.item.script).bind(this)
        func()
    }

    render(){
        return <>
            <canvas id="Executer_canvas" ref={this.refCaller} width="5000px" height="5000px"/>
        </>
    }
}

export default Canvas;
import React from 'react';
import { ItemType } from 'src/type'

class Canvas extends React.Component<{item:ItemType}, {}>{
    private canvas?: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null ;
    private refCaller: (element: HTMLCanvasElement) => void;

    constructor(props:{item:ItemType}){
        super(props);

        this.canvas = undefined;
        this.ctx    = null;

        this.refCaller = (element:HTMLCanvasElement) => {
            this.canvas = element
        }
    }

    componentDidMount(){
        this.ctx = this.canvas!.getContext("2d");
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
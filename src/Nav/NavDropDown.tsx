
import React from 'react';

// const itemFilter = async (values:{ifilter:boolean[]}) => {
//     return values.ifilter
// }

class DropDown extends React.Component<any, any> {

    constructor(props:any) {
        super(props)
        this.state = {
            tema: true,
            canvas: true,
            html: true
        }
    }

    toggleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {[e.target.name] : !this.state[e.target.name]}, 
            ()=>{console.log(this.state)}
        )
    }

    render() {
      return <div className="dropdown">
        <button className="dropbtn">
            <span className="ul">필터</span>
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            <div className="d-option">
                <label>
                    TEMA
                    <input
                        name="tema" 
                        className="d-checkbox" 
                        type="checkbox" 
                        checked={this.state.tema}
                        onChange={this.toggleChange}/>
                </label>
            </div>
            <div className="d-option">
                <label>
                    CANVAS
                    <input 
                        name="canvas"
                        className="d-checkbox" 
                        type="checkbox" 
                        checked={this.state.canvas}
                        onChange={this.toggleChange}/>
                </label>
            </div>
            <div className="d-option">
                <label>
                    HTML
                    <input 
                        name="html"
                        className="d-checkbox" 
                        type="checkbox" 
                        checked={this.state.html}
                        onChange={this.toggleChange}/>
                </label>
            </div>
        </div>
      </div>
    }
}

export default DropDown;
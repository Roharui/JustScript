
import React from 'react';

type itemFilter = {
    tema: boolean,
    canvas: boolean,
    html: boolean
}

class DropDown extends React.Component<{changeFilter:Function}, any> {

    constructor(props:{changeFilter:Function}) {
        super(props)
        this.state = {
            tema: true,
            canvas: true,
            html: true
        }
    }

    toggleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        this.setState(
            {[name] : !this.state[name]}
        , () => {

            let arr = Object.entries(this.state).map(([name, flag]) => {
                if(flag) return name
                return 'X'
            })
    
            this.props.changeFilter(arr)
        })
    }

    render() {
      return <div className="dropdown">
        <button className="dropbtn">
            <span className="ul">필터</span>
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            {/* <div className="d-option">
                <label>
                    TEMA
                    <input
                        name="tema" 
                        className="d-checkbox" 
                        type="checkbox" 
                        checked={this.state.tema}
                        onChange={this.toggleChange}/>
                </label>
            </div> */}
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
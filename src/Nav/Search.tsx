
import React from 'react';
import './Search.css'

class Search extends React.Component<{search:Function}, {value:string}> {

  constructor(props:{search:Function}){
    super(props)
    this.state = {
      value:""
    }
  }

  onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value
    })
  }

  enter = (e:React.KeyboardEvent) => {
    if(e.key == "Enter") {
      this.props.search(this.state.value)
    }
  }

    render() {
      return <>
        <div className="search-bar">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
              integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous" />
            <div className="search-content" onClick={() => this.props.search(this.state.value)}>
                <input type="search" className="search-input" onKeyUp={this.enter} onChange={this.onChange}/>
                <i className="fa fa-search"></i>
            </div>
        </div>
      </>
    }
}

export default Search;
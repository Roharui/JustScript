import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Main    from './Main'
import Creater from './Creater'
import NavMain from './Nav'
import Profile from './Profile';
import Tema    from './Tema';

import './App.css';

class App extends React.Component<any, {typeFilter:string[], styleLink:string[]}> {
  constructor(props:any){
    super(props)
    document.title = "JustScript"

    this.state = {
      typeFilter : ["html", "canvas", "tema"],
      styleLink : []
    }
  }

  changeFilter = (arr:string[]) => {
    this.setState({typeFilter:arr})
  }

  changeTema = (arr:string[]) => {
    this.setState({styleLink:arr})
  }

  render() {
    const typefilter = this.state.typeFilter
    return <>
    {
      this.state.styleLink.map(x => <link href={x} rel="stylesheet"></link>)
    }
      <NavMain changeFilter={this.changeFilter} />
      <Switch>
        <Route exact path="/"   component={() => <Main filter={typefilter}/>} />
        <Route path="/recent"   component={() => <Main filter={typefilter}/>} />
        <Route path="/itemlist" component={() => <Main filter={typefilter}/>} />
        <Route path="/report"   component={() => <Main filter={typefilter}/>} />
        <Route path="/create"   component={Creater} />
        <Route path="/profile"  component={Profile} />
        <Route path="/tema"     component={Tema}    />
      </Switch>
    </>
  }
}

export default App;
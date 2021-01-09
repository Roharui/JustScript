import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Main    from './Main'
import Creater from './Creater'
import NavMain from './Nav'
import Profile from './Profile';
import Tema    from './Tema';

import './App.css';

class App extends React.Component<any, {typeFilter:string[]}> {
  constructor(props:any){
    super(props)
    document.title = "JustScript"

    this.state = {
      typeFilter : ["html", "canvas", "tema"]
    }
  }

  changeFilter = (arr:string[]) => {
    this.setState({typeFilter:arr})
  }

  render() {
    return <>
      <NavMain changeFilter={this.changeFilter} />
      <Switch>
        <Route exact path="/"   component={() => <Main filter={this.state.typeFilter}/>} />
        <Route path="/recent"   component={() => <Main filter={this.state.typeFilter}/>} />
        <Route path="/itemlist" component={() => <Main filter={this.state.typeFilter}/>} />
        <Route path="/report"   component={() => <Main filter={this.state.typeFilter}/>} />
        <Route path="/create"   component={Creater} />
        <Route path="/profile"  component={Profile} />
        <Route path="/tema"     component={Tema} />
      </Switch>
    </>
  }
}

export default App;
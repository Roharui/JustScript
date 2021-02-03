import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Main    from './Main'
import Creater from './Creater'
import NavMain from './Nav'
import Profile from './Profile';
import Tema    from './Tema';
import {TemaManager, init} from './lib/TemaManager';

import './App.css';

class App extends React.Component<{}, {typeFilter:string[], styleLink:number[]}> {

  constructor(props:{}){
    super(props)
    document.title = "JustScript"

    this.state = {
      typeFilter : ["html", "canvas", "tema"],
      styleLink : []
    }

    init(new TemaManager(this.changeTema, this.getTema))
  }

  changeFilter = (arr:string[]) => {
    this.setState({typeFilter:arr})
  }

  changeTema = (arr:number[]) => {
    this.setState({styleLink:arr})
  }

  getTema = ():number[] => {
    return this.state.styleLink
  } 

  render() {
    const typefilter = this.state.typeFilter
    const mainElement = () => 
     <Main filter={typefilter}/>

    return <>
    {
      this.state.styleLink.map((x, i) => <link key={i} href={`http://${window.location.hostname}:3001/api/tema/${x}`} rel="stylesheet"></link>)
    }
      <NavMain changeFilter={this.changeFilter} />
      <Switch>
        <Route exact path="/"   component={mainElement} />
        <Route path="/recent"   component={mainElement} />
        <Route path="/itemlist" component={mainElement} />
        <Route path="/report"   component={mainElement} />
        <Route path="/search"   component={mainElement} />
        <Route path="/create"   component={Creater} />
        <Route path="/profile"  component={Profile} />
        <Route path="/tema"     component={Tema}    />

      </Switch>
    </>
  }
}

export default App;
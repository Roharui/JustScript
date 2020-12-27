import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Main from './Main'
import Creater from './Creater'
import NavMain from './Nav'
import Profile from './Profile';

class App extends React.Component {
  constructor(props:any){
    super(props)
    document.title = "JustScript"
  }

  render() {
    return <>
      <NavMain />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route path="/recent" component={() => <Main tag="recent"/>} />
        <Route path="/itemlist" component={() => <Main tag="list"/>} />
        <Route path="/create" component={Creater} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  }
}

export default App;
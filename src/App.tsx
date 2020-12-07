import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Main from './Main'
import Creater from './Creater'
import NavMain from './Nav'
import Profile from './Profile';

class App extends React.Component {
  componentDidMount(){
    document.title = "JustScript"
  }

  render() {
    return <>
      <NavMain />
      <Route exact path="/" component={Main} />
      <Route path="/create" component={Creater} />
      <Route path="/profile" component={Profile} />
    </>
  }
}

export default App;
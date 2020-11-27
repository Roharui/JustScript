import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Main from './Main/Main'
import Creater from './Creater/Creater'
import NavMain from './Nav/NavMain'

class App extends React.Component {
  componentDidMount(){
    document.title = "JustScript"
  }

  render() {
    return <>
      <NavMain />
      <Route exact path="/" component={Main} />
      <Route exact path="/create" component={Creater} />
    </>
  }
}

export default App;
import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Main from './Main/Main'
import NavMain from './Nav/NavMain'

class App extends React.Component {

  render() {
    return <>
      <NavMain />
      <Route exact path="/" component={Main} />
    </>
  }
}

export default App;
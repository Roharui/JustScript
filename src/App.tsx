import React from 'react';
import './App.css';
import Main from './Main/Main'
import NavMain from './Nav/NavMain'

class App extends React.Component {

  render() {
    return <>
      <NavMain />
      <Main />
    </>
  }
}

export default App;
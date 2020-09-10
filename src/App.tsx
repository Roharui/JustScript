import React from 'react';
import './App.css';
import Main from './Main/Main'
import Nav from './Nav/Nav'

class App extends React.Component {

  render() {
    return <>
    <div className="App">
      <Main />
      <Nav />
    </div>
    </>
  }
}

export default App;
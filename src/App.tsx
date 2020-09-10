import React from 'react';
import './App.css';
import Main from './Main/Main'
import Nav from './Nav/Nav'

class App extends React.Component {

  render() {
    return <>
    <div>
      <Main />
      <Nav />
    </div>
    </>
  }
}

export default App;
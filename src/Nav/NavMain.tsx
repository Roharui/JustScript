
import React from 'react';
import './Nav.css'
import Search from './Search'

class NavMain extends React.Component {

    render() {
      return <>
        <div className="topnav">
            <span className="logo">JustScript</span>
            <span className="ul active">Main</span>
            <span className="ul">News</span>
            <span className="ul">Contact</span>
            <span className="ul">About</span>
            <Search />
        </div>
      </>
    }
}

export default NavMain;
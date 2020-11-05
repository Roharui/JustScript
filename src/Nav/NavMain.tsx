
import React from 'react';
import './Nav.css'
import Search from './Search'
import SideNav from './SideNav';

class NavMain extends React.Component<any, {toggle:boolean}> {

    constructor(props:any) {
      super(props);
      this.state = {
        toggle: false
      }
    }

    toggleSideNav = () => {
      this.setState({
        toggle: !this.state.toggle
      })
    }

    render() {
      return <>
        <div className="topnav">
            <span className="logo">JustScript</span>
            <span className="ul sNav" onClick={this.toggleSideNav}>&#9776;</span>
            <span className="ul active">News</span>
            <span className="ul">Contact</span>
            <span className="ul">About</span>
            <Search />
        </div>
        <SideNav toggle={this.state.toggle}/>
      </>
    }
}

export default NavMain;
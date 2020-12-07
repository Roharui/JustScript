
import React from 'react';
import { withRouter } from "react-router-dom";
import Search from './Search'
import SideNav from './SideNav';
import DropDown from './NavDropDown';
import './Nav.css'

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

    goMain = () => {
      this.props.history.push("/")
    }

    render() {
      return <>
        <div className="topnav">
            <span className="logo" onClick={this.goMain.bind(this)}>JustScript</span>
            <span className="sNav" onClick={this.toggleSideNav}>&#9776;</span>
            <span className="ul active" onClick={this.goMain.bind(this)}>검증글</span>
            <span className="ul">최신글</span>
            <DropDown />
            <Search />
        </div>
        <SideNav toggle={this.state.toggle}/>
      </>
    }
}

export default withRouter(NavMain);
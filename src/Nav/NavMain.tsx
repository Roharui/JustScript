
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
            <span className="sNav" onClick={this.toggleSideNav}>&#9776;</span>
            <span className="ul active">검증글</span>
            <span className="ul">최신글</span>
            <div className="ul dropdown">
                <button className="dropbtn">
                    <span>필터</span>
                    <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                    <p>TEMA</p>
                    <p>CANVAS</p>
                    <p>HTML</p>
                </div>
            </div>
            <Search />
        </div>
        <SideNav toggle={this.state.toggle}/>
      </>
    }
}

export default NavMain;
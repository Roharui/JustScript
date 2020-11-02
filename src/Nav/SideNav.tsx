
import React from 'react';
import './SideNav.css'

class SideNav extends React.Component<{toggle:boolean}, {}> {

    render() {
      return <>
        <div id="mySidenav" className="sidenav" style={{width: this.props.toggle ? "250px" : "0px"}}>
            <p>About</p>
            <p>Services</p>
            <p>Clients</p>
            <p>Contact</p>
        </div>
      </>
    }
}

export default SideNav;
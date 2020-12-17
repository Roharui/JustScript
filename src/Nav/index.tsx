
import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
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

    goRecent = () => {
      this.props.history.push("/recent")
    }

    navButton({main = "ul", recent = "ul"} = {}){
      return <>
        <span className={main} onClick={this.goMain.bind(this)}>검증글</span>
        <span className={recent} onClick={this.goRecent.bind(this)}>최신글</span>
      </>
    }

    render() {
      return <>
        <div className="topnav">
            <span className="logo" onClick={this.goMain.bind(this)}>JustScript</span>
            <span className="sNav" onClick={this.toggleSideNav}>&#9776;</span>
            <Switch>
              <Route exact path="/">
                {this.navButton({main:"ul active"})}
              </Route>
              <Route path="/recent">
                {this.navButton({recent:"ul active"})}
              </Route>
              <Route>
                {this.navButton()}
              </Route>
            </Switch>
            <DropDown />
            <Search />
        </div>
        <SideNav toggle={this.state.toggle}/>
      </>
    }
}

export default withRouter(NavMain);
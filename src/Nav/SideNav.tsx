
import React from 'react';
import './SideNav.css'

class SideNav extends React.Component<{toggle:boolean}, {}> {

    constructor(props:{toggle:boolean}){
        super(props);
        this.state = {}
    }

    render() {
      return <>
        <div id="mySidenav" className="sidenav" style={{width: this.props.toggle ? "250px" : "0px"}}>
            <div className="profile">
                <div className="pro-img">
                    <img src="https://seoulforest.or.kr/wordpress/wp-content/uploads/2017/09/20171031_065922.jpg" alt="프로필" />
                    <h3>Roharui</h3>
                </div>
                <div className="w-info">
                    <span>추천수 : <span className="num rcmd">100</span></span>
                    <span>검증글 : <span className="num vfi">100</span></span>
                </div>
            </div>
            <p>Tema</p>
            <p>Items</p>
            {/* <p>Clients</p>
            <p>Contact</p> */}
        </div>
      </>
    }
}

export default SideNav;

import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import DataSender from '../lib/DataSender'
import LoginChecker from 'src/lib/LoginChecker';

import './SideNav.css'

interface profile{
    report_count:number,
    write_count:number,
    recomment_count:number,
    nickname:string,
    profile_img:string
}

type SideProps = RouteComponentProps<any> & {toggle: boolean}

class SideNav extends React.Component<SideProps, profile> {
    private ds: DataSender;

    constructor(props:SideProps){
        super(props);
        this.state = {
            report_count:-1,
            write_count:0,
            recomment_count:0,
            nickname:'',
            profile_img:''
        }
        this.ds = new DataSender();
    }

    componentDidMount(){
        this.update()
    }

    update(){        
        LoginChecker()
        .then(data => this.setState(data))
        .catch(err => this.setState({profile_img:''}))
    }

    logout = () => {
        let login = sessionStorage.getItem("login")
        sessionStorage.setItem("login", "")
        if(!login) return; 
        this.ds.logout(login)
        .then(x => {
            if(x.status === 400) alert("Input Error!")
            else this.setState({profile_img:''})
        })
    }

    render() {
      return <>
      <div id="mySidenav" className="sidenav" style={{width: this.props.toggle ? "250px" : "0px"}}>
      {this.state.profile_img.length ?         
        <>
            <div className="profile">
                <div className="pro-img">
                    <img src={this.state.profile_img} alt="프로필" />
                    <h3>{this.state.nickname}</h3>
                </div>
                <div className="w-info">
                    <span>추천수 : <span className="num rcmd">{this.state.recomment_count}</span></span>
                    <span>작성글 : <span className="num vfi">{this.state.write_count}</span></span>
                </div>
            </div>
            <Link to="/profile"><p>Profile</p></Link>
            <Link to="/itemlist"><p>Items</p></Link>
            <Link to="/profile"><p>Tema</p></Link>
            <p style={{position: "absolute", bottom: 100}} onClick={this.logout}>Logout</p>
        </>
        : 
            <p>로그인 필요</p>}
        </div>
      </>
    }
}

export default withRouter(SideNav);;
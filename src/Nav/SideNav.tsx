
import React from 'react';
import './SideNav.css'
import DataSender from '../DataSender/DataSender'

interface profile{
    report_count:number,
    write_count:number,
    recomment_count:number,
    nickname:string,
    profile_img:string
}

class SideNav extends React.Component<{toggle:boolean}, profile> {
    private ds: DataSender;

    constructor(props:{toggle:boolean}){
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
        let login = sessionStorage.getItem("login")
        if(!login) return;
        this.ds.getProfile(login)
        .then((x) => {
            if(!x.length) return;
            this.setState(x[0], () => {console.log(this.state)})
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
            <p>Tema</p>
            <p>Items</p>
            <p style={{position: "absolute", bottom: 100}}>Logout</p>
        </>
        : 
        <p>로그인 필요</p>}
        </div>
      </>
    }
}

export default SideNav;
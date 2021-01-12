
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import DataSender from '../lib/DataSender'

import './SideNav.css'

interface profile{
    report_count:number,
    write_count:number,
    recommend_count:number,
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
            recommend_count:0,
            nickname:'',
            profile_img:''
        }
        this.ds = new DataSender();
    }

    componentDidMount(){
        this.update()
    }

    update(){        
        this.ds.getProfile()
        .then(({data}) => this.setState(data))
        .catch(() => {})
    }

    logout = () => {
        this.ds.logout()
        .then(() => this.setState({profile_img:''}))
        .catch(e => alert(e.message))
    }

    render() {
        let src = this.ds.toRealPath(this.state.profile_img)
        return <>
        <div id="mySidenav" className="sidenav" style={{width: this.props.toggle ? "250px" : "0px"}}>
        {this.state.profile_img.length ?         
            <>
                <div className="profile">
                    <div className="pro-img">
                        <img src={src} alt="프로필" />
                        <h3>{this.state.nickname}</h3>
                    </div>
                    <div className="w-info">
                        <span>추천수 : <span className="num rcmd">{this.state.recommend_count}</span></span>
                        <span>작성글 : <span className="num vfi">{this.state.write_count}</span></span>
                    </div>
                </div>
                <Link to="/profile"><p>Profile</p></Link>
                <Link to="/itemlist"><p>Items</p></Link>
                <Link to="/tema"><p>Tema</p></Link>
                <Link to="/report"><p>Report</p></Link>
                <p style={{position: "absolute", bottom: 100}} onClick={this.logout}>Logout</p>
            </>
        : 
            <p onClick={this.update.bind(this)}>로그인 필요</p>}
        </div>
      </>
    }
}

export default withRouter(SideNav);;
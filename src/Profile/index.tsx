
import React from 'react';
import DataSender from 'src/DataSender/DataSender';

import './Profile.css'

class Profile extends React.Component<any, any>{
    private ds: DataSender;
    
    constructor(props:any){
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
        if(!login) {
            alert("You need to login!")
            this.props.history.push("/")
        }else{
            this.setState({...this.state, session: login})
        }
    }

    render(){
        return <>
        <div className="content">
            <div className="card"></div>
            <div className="screen"></div>
        </div>
        <div className="bottom"></div>
        </>
    }
    
}

export default Profile

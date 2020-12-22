
import React from 'react';
import { Button } from "@material-ui/core"
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
            profile_img: '',
            uploadFile: null
        }
        this.ds = new DataSender();
    }
    
    componentDidMount(){
        let login = sessionStorage.getItem("login")
        if(!login) {
            this.props.history.push("/");
            return;
        }
        this.ds.getProfile(login)
        .then(({data}) => {
            if(!data) {
                this.props.history.push("/")
                return;
            }
            this.setState(data)
        })
    }

    handleFile(e:any){
        this.setState({
            uploadFile : e.target.files[0]
        })
    }

    render(){
        return <>
        <div className="profile content">
            <div className="image">
                <img src={this.state.profile_img} alt="프로필" />
                <input type="file" onChange={e => this.handleFile(e)}/>
                <Button style={{
                            backgroundColor: "lightblue",
                            width: "100px",
                            height: "30px"
                        }} >UPDATE</Button>
            </div>
        </div>
        </>
    }
    
}

export default Profile

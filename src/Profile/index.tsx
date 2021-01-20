
import React from 'react';
import { Button } from "@material-ui/core"
import DataSender from 'src/lib/DataSender';

import './Profile.css'
import { RouteComponentProps } from 'react-router-dom';

type ProfileState = {
    report_count:number,
    write_count:number,
    recommend_count:number,
    nickname:string,
    profile_img: string,
    
    uploadFile: any
}

class Profile extends React.Component<RouteComponentProps, any>{
    private ds: DataSender;
    
    constructor(props:RouteComponentProps){
        super(props);
        this.state = {
            report_count:-1,
            write_count:0,
            recommend_count:0,
            nickname:'',
            profile_img: '',
            
            uploadFile: null
        }
        this.ds = new DataSender();
    }
    
    componentDidMount(){
        this.ds.checkLogin()
        .then(() => this.update())
        .catch(err => this.props.history.push("/"))
    }

    update(){
        this.ds.getProfile()
        .then(({data}) => {
            data.profile_img = this.ds.toRealPath(data.profile_img)
            return data
        })
        .then(data => this.setState(data))
    }

    handleFile(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            profile_img : URL.createObjectURL(e.target.files![0]),
            uploadFile : e.target.files![0]
        })
    }

    handleChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    uploadFile(){
        let {uploadFile, nickname} = this.state

        this.ds.sendFile(uploadFile, nickname)
        .then((res) => {
            window.location.reload(false);
        })
    }
    
    render(){
        
        return <div className="pcontent">
            <div className="image">
                <img src={this.state.profile_img} alt="프로필" style={{width:"200px", height:"200px"}}/>
            </div>
            <div>
                <label id="pfileLable" htmlFor="pfile">파일 바꾸기</label>
                <input type="file" id="pfile" accept="image/*" style={{display:"none"}} onChange={e => this.handleFile(e)}/>
            </div>
            <div>
                <label htmlFor="nickname">닉네임 : </label>
                <input type="text" id="nickname" name="nickname" placeholder={this.state.nickname} onChange={e => this.handleChange(e)}/>
            </div>
            <div>
            <Button style={{
                backgroundColor: "lightgreen",
                width: "100px",
                height: "30px"
            }} onClick={() => this.uploadFile()}>수정하기</Button>
            </div>
        </div>
    }
    
}

export default Profile

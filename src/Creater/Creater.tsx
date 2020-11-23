
import React from 'react';
import DataSender from '../DataSender/DataSender'

class Creater extends React.Component<any, any> {
    private ds:DataSender;

    constructor(props:any){
        super(props);
        this.ds = new DataSender();
        this.state = {
            session : null
        }
    }

    componentDidMount(){
        let login = sessionStorage.getItem("login")
        if(!login) {
            alert("You need to login!")
            this.props.history.push("/")
        }
        this.setState({session: login})
    }

    render() {
        return <></>
    }
}

export default Creater;
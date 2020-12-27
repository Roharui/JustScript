

function LoginChecker(obj:any) {

    let login = sessionStorage.getItem("login")
    if(!login) {
        obj.props.history.push("/");
        return;
    }
    obj.ds.getProfile(login)
    .then((x:{data:any}) => {
        let {data} = x
        if(!data) {
            obj.props.history.push("/")
            return;
        }
        obj.setState({...data, session:login})
    })

}

export default LoginChecker
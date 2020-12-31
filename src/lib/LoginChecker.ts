

async function LoginCheckerAsString(obj:any):Promise<string> {

    let login = sessionStorage.getItem("login")
    if(login === null) {
        obj.props.history.push("/");
    }

    console.log(login)

    let x: { data: any; } = await obj.ds.getProfile(login)
    let {data} = x
    if(!data) obj.props.history.push("/")

    return (login as string)
}

async function LoginChecker(obj:any):Promise<any> {

    let login = sessionStorage.getItem("login")
    if(login === null) {
        obj.props.history.push("/");
    }

    console.log(login)

    let x: { data: any; } = await obj.ds.getProfile(login)
    let {data} = x
    if(!data) obj.props.history.push("/")

    return {...data, session:login}
}

export {LoginChecker, LoginCheckerAsString}
export default LoginChecker
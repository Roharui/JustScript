import DataSender from "./DataSender"

const ds = new DataSender;

async function LoginCheckerAsString():Promise<string> {

    let login = sessionStorage.getItem("login")
    if(login === null) {
        throw new Error("세션이 만료되었습니다.")
    }

    let x: { data: any; } = await ds.getProfile(login)
    let {data} = x
    if(!data) throw new Error("세션이 만료되었습니다.")

    return (login as string)
}

async function LoginChecker():Promise<any> {

    let login = sessionStorage.getItem("login")
    if(login === null) {
        throw new Error("세션이 만료되었습니다.")
    }

    let x: { data: any; } = await ds.getProfile((login as string))
    let {data} = x
    if(!data) throw new Error("세션이 만료되었습니다.")

    return {...data, session:login}
}

export {LoginChecker, LoginCheckerAsString}
export default LoginChecker
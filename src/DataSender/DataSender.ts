
import {ItemType} from '../Main/Item'

const hostname:string = window.location.hostname

class DataSender {
    async getItems(score:number){
        let rowitems = await fetch(`http://${hostname}:3001/item?score=${score}`)
        let items = await rowitems.json()
        return items
    }

    async insertItem(data:{item:ItemType, session:string}){
        return fetch(`http://${hostname}:3001/item/insert`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
    }

    async getProfile(session:string){
        return fetch(`http://${hostname}:3001/profile`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                session: session
            })
        })
        .then(x => x.json())
    }

    async logout(session:string){
        return fetch(`http://${hostname}:3001/login/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                session: session
            })
        })
        .then(x => x.json())
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}){
        return fetch(`http://${hostname}:3001/login/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(register)
        }).then(x => x.json())
    }
}

export default DataSender
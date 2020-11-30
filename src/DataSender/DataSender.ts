
import {ItemType} from '../Main/Item/Item'

class DataSender {
    async getItems(){
        let rowitems = await fetch(`http://${window.location.hostname}:3001/item`)
        let items = await rowitems.json()
        return items
    }

    async insertItem(data:{item:ItemType, session:string}){
        return fetch(`http://${window.location.hostname}:3001/item/insert`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
    }

    async getProfile(session:string){
        return fetch(`http://${window.location.hostname}:3001/login/profile`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                session: session
            })
        }).then(x => x.json())
    }

    async logout(session:string){
        return fetch(`http://${window.location.hostname}:3001/login/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                session: session
            })
        }).then(x => x.json())
    }
}

export default DataSender
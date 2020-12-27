
import {ItemType} from '../Main/Item'
import axios from "axios";

const hostname:string = window.location.hostname

class DataSender {
    async getItems(score:number){
        let rowitems = await fetch(`http://${hostname}:3001/api/item?score=${score}`)
        let items = await rowitems.json()
        return items
    }

    async insertItem(data:{item:ItemType, session:string}){
        return fetch(`http://${hostname}:3001/api/item/insert`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
    }

    async getProfile(session:string){
        return fetch(`http://${hostname}:3001/api/profile`, {
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
        return fetch(`http://${hostname}:3001/api/login/logout`, {
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
        return fetch(`http://${hostname}:3001/api/login/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(register)
        }).then(x => x.json())
    }

    async sendFile(file:File, session:string, nickname:string){
        let formData = new FormData();
        formData.append('upload_file', file);
        formData.append('session', session);
        formData.append('nickname', nickname);

        return axios.post(`http://${hostname}:3001/api/profile/update`, formData)
    }
    
}

export default DataSender
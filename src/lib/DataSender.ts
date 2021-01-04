
import {ItemType} from '../Main/Item'
import axios from "axios";
import {URL} from 'url'

const hostname:string = window.location.hostname

class DataSender {
    static instance:DataSender;

    constructor() {
        if(DataSender.instance) return DataSender.instance;
        DataSender.instance = this
    }

    async getItems(score:number, filter:string[], session?:string | null){
        let surl = session ? `&session=${session}` : ""
        let rowitems = await fetch(`http://${hostname}:3001/api/item?score=${score}&filter=${filter.toString()}` + surl)
        let items = await rowitems.json()
        return items
    }

    async getOwnItems(session:string){
        return fetch(`http://${hostname}:3001/api/item/owner`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                session: session
            })
        }).then(x => x.json())
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

    async deleteItem(id:number, session:string){
        return fetch(`http://${hostname}:3001/api/item/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                id: id,
                session:session
            })
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
        .catch(err => err)
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

    async recommend(data:{item_id:number, session:string, flag:number}){
        return fetch(`http://${hostname}:3001/api/item/recommend`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
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
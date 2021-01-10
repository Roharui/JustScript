
import {ItemType} from '../Main/Item'
import axios from "axios";

const hostname:string = window.location.hostname

const header = (method:"GET"|"POST"|"DELETE"|"PUT", data?:any):RequestInit => {
    return {
        method: method,
        mode: 'cors',
        headers: {
            'Accept':  'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
        },
        credentials: 'include',
        body:JSON.stringify(data)
    }
}

class DataSender {
    static instance:DataSender;

    constructor() {
        if(DataSender.instance) return DataSender.instance;
        DataSender.instance = this
    }

    toRealPath(src:string){
        return `http://${hostname}:3001/${src}`
    }

    async getItems(score:number, filter:string[]){
        let rowitems = await fetch(
            `http://${hostname}:3001/api/item?score=${score}&filter=${filter.toString()}`,
            header("GET")
        )
        let items = await rowitems.json()
        return items
    }

    async getOwnItems(){
        let rowitems = await fetch(
            `http://${hostname}:3001/api/item/owner`,
            header("GET")
        )
        let items = await rowitems.json()
        return items
    }

    async insertItem(data:{item:ItemType}){
        return fetch(`http://${hostname}:3001/api/item/insert`, 
            header("POST", data)
        )
    }

    async deleteItem(id:number){
        return fetch(
            `http://${hostname}:3001/api/item/delete`, 
            header("DELETE", {id})
        )
    }

    async getProfile(){
        return fetch(
            `http://${hostname}:3001/api/profile`,
            header("GET")
        )
        .then(x => x.json())
        .catch(err => err)
    }

    async logout(){
        return fetch(`http://${hostname}:3001/api/login/logout`, header("DELETE"))
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}){
        return fetch(`http://${hostname}:3001/api/login/register`, header("POST", register))
        .then(x => x.json())
    }

    async recommend(data:{item_id:number, flag:number}){
        return fetch(`http://${hostname}:3001/api/item/recommend`, header("POST", data))
    }

    async sendFile(file:File, nickname:string){
        let formData = new FormData();
        formData.append('upload_file', file);
        formData.append('nickname', nickname);

        return axios.put(`http://${hostname}:3001/api/profile/update`, formData, {withCredentials:true})
    }
}

export default DataSender
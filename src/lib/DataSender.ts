
import { ItemType } from 'src/type'
import axios from "axios";

const header = (method:"GET"|"POST"|"DELETE"|"PUT", data?:object):RequestInit => {
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

function handleErrors(response:Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class DataSender {
    static instance:DataSender;
    private host!: string;

    constructor() {
        if(DataSender.instance) return DataSender.instance;
        this.host = `http://${window.location.hostname}:3001` as string
        DataSender.instance = this
    }

    toRealPath(src:string){
        return `${this.host}/${src}`
    }

    request(url:string, method:"GET"|"POST"|"DELETE"|"PUT", data?:object){
        return fetch(url, header(method, data))
        .then(handleErrors)
        .then(x => x.json())
    }

    async getItems(score:number, filter:string[]){
        return this.request(
            `${this.host}/api/item?score=${score}&filter=${filter.toString()}`,
            "GET"
        )
    }

    async getOwnItems(filter:string[]){
        return this.request(
            `${this.host}/api/item/owner?filter=${filter.toString()}`,
            "GET"
        )
    }

    async searchItems(query:string, filter:string[]){
        console.log(query)
        return this.request(
            `${this.host}/api/item/search?param=${query}&filter=${filter.toString()}`,
            "GET"
        )
    }

    async checkLogin(){
        return this.request(
            `${this.host}/api/login`,
            "GET"
        )
    }

    async insertItem(data:{item:ItemType}){
        return this.request(
            `${this.host}/api/item`,
            "POST", 
            data
        )
    }

    async deleteItem(id:number){
        return this.request(
            `${this.host}/api/item`,
            "DELETE", 
            {id}
        )
    }

    async getProfile(){
        return this.request(
            `${this.host}/api/profile`,
            "GET"
        )
    }

    async logout(){
        return this.request(
            `${this.host}/api/login`,
            "DELETE"
        )
    }

    async register(register:{id:string, pw:string, pwc:string, nickname:string}){
        return this.request(
            `${this.host}/api/login/register`,
            "POST", 
            register
        )
    }

    async recommend(data:{item_id:number, flag:number}){
        return this.request(
            `${this.host}/api/item/recommend`,
            "POST", 
            data
        )
    }

    async sendFile(file:File, nickname:string){
        let formData = new FormData();
        formData.append('upload_file', file);
        formData.append('nickname', nickname);

        return axios.put(`${this.host}/api/profile`, formData, {withCredentials:true})
    }

    async record(){
        return this.request(
            `${this.host}/api/tema/record`,
            "POST"
        )
    }

    async temaLst(){
        return this.request(
            `${this.host}/api/tema/list`,
            "GET"
        )
    }

    async pushTema(tema:number){
        return this.request(
            `${this.host}/api/tema/`,
            "POST",
            {tema}
        )
    }

    async deleteTema(id:number){
        return this.request(
            `${this.host}/api/tema/`,
            "DELETE",
            {id}
        )
    }

    async updatePrio(id:number, flag:number){
        return this.request(
            `${this.host}/api/tema/prio`,
            "POST",
            {id, flag}
        )
    }

    async reportUpdate() {
        return this.request(
            `${this.host}/api/report/list`,
            "POST"
        )
    }

    async report(item:number){
        return this.request(
            `${this.host}/api/report/`,
            "POST",
            {item}
        )
    }

    async forceDelete(item:number){
        return this.request(
            `${this.host}/api/report/`,
            "DELETE",
            {item}
        )
    }

}

export default DataSender
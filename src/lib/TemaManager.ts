import DataSender from "./DataSender";

var instance: TemaManager;

const init = (temaManager:TemaManager) => {
    instance = temaManager
}

const getInstance = () => {
    return instance
}

class TemaManager {
    static instance:TemaManager;
    setter!: (arr: number[]) => void;
    getter!:()=>number[]
    ds: DataSender
    

    constructor(changeCss:(arr:number[])=>void, getCss:()=>number[]) {
        this.setter = changeCss
        this.getter = getCss

        this.ds = new DataSender()
    }

    push(ele:number) {
        this.ds.pushTema(ele)
        .then(x => {
            let arr = this.getter()
            arr.unshift(ele)
            this.setter(arr)
        })
        .catch(e => {
            alert(e.message)
        })
    }

    pop(ele:number){
        this.ds.deleteTema(ele)
        .then(x => {
            let arr = this.getter()
            const idx = arr.indexOf(ele) 
            if (idx > -1) arr.splice(idx, 1)
            this.setter(arr)
        })
        .catch(e => {
            alert(e.message)
        })
    }

    isin(ele:number){
        return this.getter().includes(ele)
    }

}

export {TemaManager, init, getInstance}
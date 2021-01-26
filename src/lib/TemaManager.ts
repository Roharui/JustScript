
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

    constructor(changeCss:(arr:number[])=>void, getCss:()=>number[]) {
        this.setter = changeCss
        this.getter = getCss
    }

    push(ele:number) {
        let arr = this.getter()
        arr.push(ele)
        this.setter(arr)
    }

    pop(ele:number){
        let arr = this.getter()
        const idx = arr.indexOf(ele) 
        if (idx > -1) arr.splice(idx, 1)
        this.setter(arr)
    }

    isin(ele:number){
        return this.getter().includes(ele)
    }

}

export {TemaManager, init, getInstance}
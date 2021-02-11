export interface CreaterState{
    session:string,
    item:ItemType,
    show_popup:boolean
}

export interface profile{
    report_count:number,
    write_count:number,
    recommend_count:number,
    nickname:string,
    profile_img:string,
    permission:number
}

export interface ItemType{
    id : number,
    type: 'tema' | 'canvas' | 'html' | 'writer',
    img : string,
    name : string,
    descript: string,
    script: string,
    score : number,
    openAble: boolean,
    width: string,
    height: string;
    own: number;
    recommended: number;
}

export interface Opertion{
    closer: () => void,
    writer: (script:string) => void,
}
  
export interface PopupType{
    item: ItemType,
    type: "html" | "canvas" | "tema" | "writer"
    oper: Opertion;
}

export interface MainState {
    items:ItemType[];
    cur_script: ItemType;
    wirteAble: boolean;
    show_popup: boolean;
    isAdmin:boolean;
}


export type ProfileState = {
    report_count:number,
    write_count:number,
    recommend_count:number,
    nickname:string,
    profile_img: string,
    
    uploadFile: any
}

export type ItemProps = {
    key: number;
    data: ItemType;
    updater:Function;
    isAdmin:boolean;
}

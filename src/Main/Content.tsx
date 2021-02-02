
import React from 'react';
import Iframe from './Item/Iframe'
import Canvas from './Item/Canvas';
import { ItemType } from 'src/type'

// const tema = <></>;
const canvas = (item:ItemType) => <Canvas item={item}/>
const html = (item:ItemType) => <Iframe item={item}/>

export function Content(item:ItemType){
  if(item.type === 'html') return html(item);
  if(item.type === 'canvas' ) return canvas(item)
  return <></>
}
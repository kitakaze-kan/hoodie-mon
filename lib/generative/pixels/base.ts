import type p5 from "p5"
import { AttributeProps  } from "../attributes/createAttribute";
import { setChestPart } from "./chestParts";
import { setEyePart } from "./eyeParts";
import { setFaceParts } from "./faceParts";
import { setHeadPart } from "./headParts"

export type GridSet = {
    x:number,
    y:number
    width: number,
    height: number
}
export type MonoColorSet = {
    base: string,
    reverse: string
}
export const PIXEL_SIZE = 8;
export const HOOD_GRID:GridSet[] = [
    {x:8, y:10,width: 1, height: 5},
    {x:9, y:8,width: 1, height: 2},
    {x:10, y:7,width: 1, height: 1},
    {x:11, y:6,width: 1, height: 1},
    {x:12, y:5,width: 2, height: 1},
    {x:9, y:15,width: 1, height: 2},
    {x:12, y:19,width: 1, height: 1},
    {x:24, y:10,width: 1, height: 5},
    {x:23, y:8,width: 1, height: 2},
    {x:22, y:7,width: 1, height: 1},
    {x:21, y:6,width: 1, height: 1},
    {x:19, y:5,width: 2, height: 1},
    {x:23, y:15,width: 1, height: 2},
    {x:20, y:19,width: 1, height: 1},
    {x:14, y:4,width: 5, height: 1},
]

export const HEAD_GRID:GridSet[] = [
    {x:14, y:5,width: 5, height: 1},
    {x:12, y:6,width: 9, height: 1},
    {x:11, y:7,width: 11, height: 1},
    {x:10, y:8,width: 13, height: 2},
    {x:9, y:10,width: 15, height: 5},
    {x:10, y:15,width: 13, height: 2},
    {x:11, y:17,width: 11, height: 1},
    {x:12, y:18,width: 9, height: 1},
    {x:14, y:19,width: 5, height: 1},
]

export const BODY_GRID:GridSet[] = [
    {x:13, y:20,width: 7, height: 15},
    {x:11, y:21,width: 2, height: 13},
    {x:10, y:22,width: 1, height: 12},
    {x:9, y:23,width: 1, height: 11},
    {x:8, y:24,width: 1, height: 10},
    {x:7, y:25,width: 1, height: 9},
    {x:6, y:27,width: 1, height: 7},
    {x:5, y:30,width: 1, height: 4},
    {x:20, y:21,width: 2, height: 14},
    {x:22, y:22,width: 1, height: 13},
    {x:23, y:23,width: 1, height: 12},
    {x:24, y:24,width: 1, height: 11},
    {x:25, y:25,width: 1, height: 10},
    {x:26, y:27,width: 1, height: 8},
    {x:27, y:30,width: 1, height: 5},
    {x:13, y:19,width: 1, height: 1},
    {x:11, y:18,width: 1, height: 1},
    {x:10, y:17,width: 1, height: 1},
    {x:19, y:19,width: 1, height: 1},
    {x:21, y:18,width: 1, height: 1},
    {x:22, y:17,width: 1, height: 1},
]
export const BODY_SUB_GRID:GridSet[] = [
    {x:8, y:31,width: 1, height: 3},
    {x:9, y:28,width: 1, height: 3},
    {x:10, y:26,width: 1, height: 2},
    {x:22, y:26,width: 1, height: 2},
    {x:23, y:28,width: 1, height: 3},
    {x:24, y:31,width: 1, height: 3},
    {x:23, y:22,width: 1, height: 1},
    {x:24, y:23,width: 1, height: 1},
    {x:25, y:24,width: 1, height: 1},
    {x:26, y:25,width: 1, height: 2},
    {x:27, y:27,width: 1, height: 3},
    {x:28, y:30,width: 1, height: 4},
]

export const TABACCO_GRID_1:GridSet[] = [
    {x:17, y:18,width: 7, height: 1}
]

export const TABACCO_GRID_2:GridSet[] = [
    {x:24, y:18,width: 1, height: 1}
]

export const TABACCO_GRID_3:GridSet[] = [
    {x:25, y:17,width: 1, height: 1},
    {x:26, y:16,width: 2, height: 1},
    {x:27, y:15,width: 3, height: 1}
]


export const BODY_CHECK:GridSet = {x:16, y:19,width: 1, height: 14}

export const setBody = (p:p5, attr: AttributeProps) => {
    HOOD_GRID.forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.mainColor)
    })
    HEAD_GRID.forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, setMonoColor(attr).base)
    })
    BODY_GRID.forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.mainColor)
    })
    BODY_SUB_GRID.forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.subColor)
    })
    
    createPixel(p,BODY_CHECK.x,BODY_CHECK.y,BODY_CHECK.width,BODY_CHECK.height,setMonoColor(attr).base)
}

export const setFace = (p:p5, attr: AttributeProps) => {

    setFaceParts(attr.facePoint).forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, setMonoColor(attr).reverse)
    })
}

export const setHead = (p:p5, attr: AttributeProps) => {

    setHeadPart(attr.head).forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.subColor)
    })
}

export const setChest = (p:p5, attr: AttributeProps) => {

    setChestPart(attr.checst).forEach(grid => {
        createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.subColor)
    })
}

export const setEye = (p:p5, attr: AttributeProps) => {

    const parts:GridSet[][] = setEyePart(attr.eye)
    if(parts && parts.length>0){
        parts[0].forEach(grid => {
            createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.subColor)
        })
        if(parts.length>1){
            parts[1].forEach(grid => {
                createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.accentColor)
            })
        }
    }
}

export const setTabacco = (p:p5, attr: AttributeProps) => {
    if(attr.hasTobacco) {
        TABACCO_GRID_1.forEach(grid => {
            createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.accentColor)
        })
        TABACCO_GRID_2.forEach(grid => {
            createPixel(p,grid.x, grid.y, grid.width, grid.height, "#e53835")
        })
        TABACCO_GRID_3.forEach(grid => {
            createPixel(p,grid.x, grid.y, grid.width, grid.height, attr.accentColor)
        })
    }

}

const createPixel = (p:p5, x:number, y:number, width:number, height: number, color: string) => {
    let col = p.color(color);
    let img = p.createImage(width*PIXEL_SIZE, height*PIXEL_SIZE);
    img.loadPixels() ;
    let fullImage = img.width * img.height * 4;

    for(let i = 0; i < fullImage; i += 4){
        img.pixels [i] = p.red(col);      
        img.pixels [i + 1] = p.green(col);
        img.pixels [i + 2] = p.blue(col); 
        img.pixels [i + 3] = p.alpha(col);
    }
    img.updatePixels()
    p.image(img, x*PIXEL_SIZE, y*PIXEL_SIZE);
}

const setMonoColor = (attr: AttributeProps):MonoColorSet => {
    if(attr.mainColor === "#000000" || attr.subColor === "#000000" || attr.accentColor === "#000000"){
        return {
            base: "#ffffff",
            reverse: "#000000"
        }
    } else {
        return {
            base: "#000000",
            reverse: "#ffffff"
        }
    }

}


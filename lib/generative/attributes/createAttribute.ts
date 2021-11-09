import { SHA256 } from "crypto-js"
import { CHEST_TYPES } from "../pixels/chestParts"
import { HEAD_TYPES } from "../pixels/headParts"

export type AttributeProps = {
    name: string
    backbround: string
    mainColor: string
    subColor: string
    accentColor: string
    facePoint: number[][]
    head: HEAD_TYPES
    eye: number
    checst: CHEST_TYPES
}

const HEAD_ATTR_NUM = 6
const EYE_ATTR_NUM = 4
const CHEST_ATTR_NUM = 4

export const createAttr = (text:string):AttributeProps => {

    let name = text
    let backbround = ''
    let mainColor = ''
    let subColor = ''
    let accentColor = ''
    let facePoint: number[][] = []
    let head = 0
    let eye = 0
    let checst = 0

    const hex = SHA256(text).toString()

    const hexForFace = hex.slice(0,22)
    const hexForExtra = hex.slice(22,40)
    const hexForColor = hex.slice(40,64)

    const hexForColorArr = hexForColor.match(/.{6}/g);
    const hexForFaceArr = hexForFace.match(/.{2}/g);
    const hexForExtraArr = hexForExtra.match(/.{2}/g);

    if(hexForColorArr){
        mainColor = colorCheck(hexForColorArr[0])
        subColor = colorCheck(hexForColorArr[3])
        accentColor = colorCheck(hexForColorArr[1])
        backbround = colorCheck(hexForColorArr[2])
    }
    if(hexForFaceArr) {
        let tmp:string[] = []
        let results:number[][] = []
        
        hexForFaceArr?.map(h => tmp.push(hex2bin(h)))
        const tmp2 = tmp.slice(0,11)

        tmp2.forEach((bn,index) => {
            const bnArr = bn.match(/.{1}/g)
            if(!bnArr) return
            const bnArr2 = bnArr.map(bn => Number(bn))
            results[index] = bnArr2
        })
        facePoint = results
    }

    if(hexForExtraArr){
        eye = setExtraType(hexForExtraArr[0], EYE_ATTR_NUM)
        checst = setExtraType(hexForExtraArr[2], CHEST_ATTR_NUM)
        head = setExtraType(hexForExtraArr[1], HEAD_ATTR_NUM)
    }

    return {
        name: name,
        backbround: backbround,
        mainColor: mainColor,
        subColor: subColor,
        accentColor: accentColor,
        facePoint: facePoint,
        head: head,
        eye: eye,
        checst: checst
    }
    
}


const hex2bin = (hex:string):string => {
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}

const hex2Dec = (hex: string):number => {
    return parseInt(hex,16)
}


 const setExtraType = (hex: string, typeNum: number):number => {
     const numForHead = hex2Dec(hex)
     return numForHead % typeNum
 }

 const colorCheck = (colorStr: string): string => {
     return colorStr === '000000' || colorStr === 'ffffff' ? '#a9a9a9' : `#${colorStr}`
 }
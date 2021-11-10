import type { GridSet } from "./base"

const START_X = 11
const START_Y = 9

export const setFaceParts = (bn2Arr: number[][]):GridSet[] => {
    let faceGrid:GridSet[] = []
    bn2Arr.forEach((bnArr, index) => {
        bnArr.forEach((bn, num) => {
            if(bn===1){
                const grid:GridSet = {x:index+START_X, y:num+START_Y, width:1, height:1}
                faceGrid.push(grid)
            }
        })
    })
    return faceGrid
}
import type { GridSet } from "./base"

export enum HEAD_TYPES {
    NONE,
    HEADPHONE,
    EAR,
    HOPTER,
    BIG_EAR,
    SPEAKERPHONE,
}

export const EAR_GRID:GridSet[] = [
    {x:7, y:4,width: 1, height: 4},
    {x:8, y:3,width: 1, height:6},
    {x:9, y:3,width: 1, height:4},
    {x:10, y:3,width: 1, height:3},

    {x:25, y:4,width: 1, height: 4},
    {x:24, y:3,width: 1, height:6},
    {x:23, y:3,width: 1, height:4},
    {x:22, y:3,width: 1, height:3},
]

export const HEADPHONE_GRID:GridSet[] = [
    {x:4, y:11,width: 1, height: 3},
    {x:5, y:10,width: 3, height: 5},
    {x:7, y:9,width: 2, height: 1},
    {x:8, y:8,width: 1, height: 1},
    {x:8, y:7,width: 2, height: 1},
    {x:9, y:6,width: 2, height: 1},
    {x:10, y:5,width: 2, height: 1},
    {x:11, y:4,width: 3, height: 1},
    {x:13, y:3,width: 7, height: 1},
    {x:28, y:11,width: 1, height: 3},
    {x:25, y:10,width: 3, height: 5},
    {x:24, y:9,width: 2, height: 1},
    {x:24, y:8,width: 1, height: 1},
    {x:23, y:7,width: 2, height: 1},
    {x:22, y:6,width: 2, height: 1},
    {x:21, y:5,width: 2, height: 1},
    {x:19, y:4,width: 3, height: 1},
]

export const SPEAKERPHONE_GRID:GridSet[] = [
    {x:3, y:11,width: 1, height: 3},
    {x:4, y:10,width: 3, height: 5},
    {x:4, y:6,width: 1, height: 4},

    {x:29, y:11,width: 1, height: 3},
    {x:26, y:10,width: 3, height: 5},
    {x:28, y:6,width: 1, height: 4},
]

export const BIG_EAR_GRID:GridSet[] = [
    {x:4, y:4,width: 6, height: 1},
    {x:5, y:5,width: 6, height: 1},
    {x:6, y:6,width: 5, height: 1},
    {x:7, y:7,width: 3, height: 1},
    {x:8, y:8,width: 1, height: 1},
    {x:23, y:4,width: 6, height: 1},
    {x:22, y:5,width: 6, height: 1},
    {x:22, y:6,width: 5, height: 1},
    {x:23, y:7,width: 3, height: 1},
    {x:24, y:8,width: 1, height: 1},
]

export const HOPTER_GRID:GridSet[] = [
    {x:11, y:1,width: 11, height: 1},
    {x:16, y:1,width: 1, height: 3},
]

export const setHeadPart = (type: HEAD_TYPES):GridSet[] => {
    switch (type) {
        case HEAD_TYPES.NONE:
            return []
        case HEAD_TYPES.EAR:
            return EAR_GRID
        case HEAD_TYPES.HEADPHONE:
            return HEADPHONE_GRID
        case HEAD_TYPES.SPEAKERPHONE:
            return SPEAKERPHONE_GRID
        case HEAD_TYPES.BIG_EAR:
            return BIG_EAR_GRID
        case HEAD_TYPES.HOPTER:
            return HOPTER_GRID
        default:
            return []
    }
}
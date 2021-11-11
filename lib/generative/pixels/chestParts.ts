import type { GridSet } from "./base"

export enum CHEST_TYPES { 
    DIAMOND,
    NONE,
    TRIANGLE,
    WING,
    HEART,
}


export const HEART_GRID:GridSet[] = [
    {x:12, y:25,width: 1, height:2},
    {x:13, y:24,width: 1, height:4},
    {x:14, y:24,width: 1, height:5},
    {x:15, y:25,width: 1, height:5},
    {x:16, y:26,width: 1, height:5},

    {x:20, y:25,width: 1, height:2},
    {x:19, y:24,width: 1, height:4},
    {x:18, y:24,width: 1, height:5},
    {x:17, y:25,width: 1, height:5},
]

export const DIAMOND_GRID:GridSet[] = [
    {x:13, y:27,width: 1, height:1},
    {x:14, y:26,width: 1, height:3},
    {x:15, y:25,width: 1, height:5},
    {x:16, y:24,width: 1, height:7},
    {x:17, y:25,width: 1, height:5},
    {x:18, y:26,width: 1, height:3},
    {x:19, y:27,width: 1, height:1},
]

export const TRIANGLE_GRID:GridSet[] = [
    {x:16, y:28,width: 1, height:1},
    {x:15, y:27,width: 3, height:1},
    {x:14, y:26,width: 5, height:1},
    {x:13, y:25,width: 7, height:1},
    {x:12, y:24,width: 9, height:1},
]

export const WING_GRID:GridSet[] = [
    {x:4, y:16,width: 1, height:7},
    {x:5, y:17,width: 1, height:7},
    {x:6, y:18,width: 1, height:6},
    {x:7, y:19,width: 1, height:5},
    {x:8, y:20,width: 1, height:4},
    {x:9, y:21,width: 1, height:2},
    {x:28, y:16,width: 1, height:7},
    {x:27, y:17,width: 1, height:7},
    {x:26, y:18,width: 1, height:6},
    {x:25, y:19,width: 1, height:5},
    {x:24, y:20,width: 1, height:4},
    {x:23, y:21,width: 1, height:2},
]

export const setChestPart = (type: CHEST_TYPES):GridSet[] => {
    switch (type) {
        case CHEST_TYPES.NONE:
            return []
        case CHEST_TYPES.HEART:
            return HEART_GRID
        case CHEST_TYPES.DIAMOND:
            return DIAMOND_GRID
        case CHEST_TYPES.TRIANGLE:
            return TRIANGLE_GRID
        case CHEST_TYPES.WING:
            return WING_GRID
        default:
            return []
    }
}
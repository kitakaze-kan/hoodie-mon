import type { GridSet } from "./base"

export enum EYE_TYPES {
    SUN_GLASS,
    HERO_GLASS,
    SLIT,
    NONE,

}


export const HERO_GLASS_GRID_1:GridSet[] = [
    {x:9, y:11,width: 2, height:2},
    {x:22, y:11,width: 2, height:2},
    {x:11, y:10,width: 11, height:1},
    {x:11, y:13,width: 11, height:1},
]

export const HERO_GLASS_GRID_2:GridSet[] = [
    {x:11, y:11,width: 11, height:1},
    {x:11, y:12,width: 11, height:1},
]

export const SUN_GLASS_GRID:GridSet[] = [
    {x:9, y:11,width: 15, height:1},
    {x:10, y:12,width: 6, height:1},
    {x:11, y:13,width: 4, height:1},
    {x:12, y:14,width: 2, height:1},

    {x:17, y:12,width: 6, height:1},
    {x:18, y:13,width: 4, height:1},
    {x:19, y:14,width: 2, height:1},
]

export const SLIT_GRID:GridSet[] = [
    {x:9, y:10,width: 15, height:1},
    {x:9, y:12,width: 15, height:1},
]


export const setEyePart = (type: EYE_TYPES):GridSet[][] => {
    switch (type) {
        case EYE_TYPES.NONE:
            return []
        case EYE_TYPES.HERO_GLASS:
            return [HERO_GLASS_GRID_1, HERO_GLASS_GRID_2]
        case EYE_TYPES.SUN_GLASS:
            return [SUN_GLASS_GRID]
        case EYE_TYPES.SLIT:
            return [SLIT_GRID]
        default:
            return []
    }
}
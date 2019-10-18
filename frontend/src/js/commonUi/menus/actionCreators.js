import {
    TOGGLE_NAVMENU,
    CLOSE_NAVMENU,
} from '../../actionTypes'

export const toggleNavMenu = () => {return { type: TOGGLE_NAVMENU } }
export const closeNavMenu = () => {return { type: CLOSE_NAVMENU } }
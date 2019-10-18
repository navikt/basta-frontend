import {
    TOGGLE_NAVMENU,
    CLOSE_NAVMENU
} from '../../actionTypes'


export default (state = {
    visible: false

}, action) => {
    switch (action.type) {
        case TOGGLE_NAVMENU:
            return {
                ...state,
                visible: !state.visible
            }
        case CLOSE_NAVMENU:
            return {
                ...state,
                visible: false
            }
        default:
            return state
    }
}


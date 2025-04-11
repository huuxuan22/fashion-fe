import { currentUser } from "./Action"
import { CURRENT_USER } from "./ActionType"


const initialValue = {
    currentUser: null,
}


export const userReducer = (store = initialValue, {type,payload}) => {
    if (type === CURRENT_USER) {
        return {...store,currentUser: payload}
    }else {
        return store
    }
}
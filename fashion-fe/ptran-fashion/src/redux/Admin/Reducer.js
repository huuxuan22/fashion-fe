import { GET_ALL_ORDER } from "./ActionType"


const initialValue = {
    ordersAdmin: [],
}


export const orderAdminReducer = (store = initialValue, {type,payload}) => {
    if (type === GET_ALL_ORDER) {
        return {...store,ordersAdmin: payload}
    }else {
        return store
    }
}
import { GET_ALL_PRODUCT } from "./ActionType"


const initialValue = {
    products: [],

}


export const productsReducer = (store = initialValue, {type,payload}) => {
    if (type === GET_ALL_PRODUCT) {
        return {...store,products: payload}
    }else {
        return store
    }
}
import { ADD_NEW_PRODUCT_TO_CART, ADD_NEW_PRODUCT_VARIANT_TO_CART, GET_ALL_CART } from "./ActionType";

const initialValue = {
    carts: [],
};

export const cartReducer = (store = initialValue, { type, payload }) => {
    if (type === ADD_NEW_PRODUCT_VARIANT_TO_CART) {
        return {
            ...store,
            carts: [...store.carts, payload] // dùng store.carts thay vì carts
        };
    } if (type === ADD_NEW_PRODUCT_TO_CART) {
        return {
            ...store,
            carts: [...store.carts, payload] // dùng store.carts thay vì carts
        };
    }if (type === GET_ALL_CART) {
        return {
            ...store,
            carts: payload // dùng store.carts thay vì carts
        };
    }else {
        return store;
    }
};

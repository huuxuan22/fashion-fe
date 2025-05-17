import {
  GET_ALL_NOTIFICATION,
  LOAD_MORE_NOTIFICATION,
  NOTIFICATION_LOADING,
  NOTIFICATION_ERROR,
  GET_ALL_NEW_NOTIFICATION,
  ADD_NEW_NOTIFICATION,
  SET_NOTIFICATION_TO_ZERO,
} from "./ActionType";

const initialValue = {
  notificationNew: [], // số lượng thông báo mới
  notifications: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 0,
};

export const notificationReducer = (
  store = initialValue,
  { type, payload, page, total }
) => {
  switch (type) {
    case NOTIFICATION_LOADING:
      return { ...store, loading: true, error: null };

    case GET_ALL_NOTIFICATION:
      return {
        ...store,
        notifications: payload,
        loading: false,
        error: null,
        total: total,
        currentPage: 0,
      };

    case LOAD_MORE_NOTIFICATION:
      return {
        ...store,
        notifications: [...store.notifications, ...payload],
        loading: false,
        error: null,
        currentPage: page,
      };

    case NOTIFICATION_ERROR:
      return { ...store, loading: false, error: payload };

    case GET_ALL_NEW_NOTIFICATION:
      return {
        ...store,
        notificationNew: [...store.notificationNew, ...payload],
      };
    case ADD_NEW_NOTIFICATION:
      console.log("đã vào đây thao tác ", store.notificationNew + 1);
      return {
        ...store,
        notificationNew: [...store.notificationNew, payload],
      };
    case SET_NOTIFICATION_TO_ZERO:
      return {
        ...store,
        notificationNew: [],
      };
    default:
      return store;
  }
};

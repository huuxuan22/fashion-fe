import { GET_ALL_COMMENT_BY_RATING, GET_ALL_COMMNENT, GET_ALL_FEEDBACK, GET_ALL_FEEDBACK_MESSAGE, GET_ALL_MEDIA, GET_ALL_TOTAL_PAGE, GET_AVERAGE_RATING, UPDATE_STATUS_SHOW_FEEDBACK_MESSAGE } from "./ActionType"




const initialValue = {
    feedbacks: [],
    feedbackMessage: [],
    commentsRating: [],
    countComment: null,
    countMedia: null,
    totalPage : 0,
    averageRating: 5.0,

}
export const feedbackReducer = (store = initialValue, {type,payload}) => {
    if (type === GET_ALL_FEEDBACK) {
        return {...store,feedbacks: payload}
    }if (type === GET_ALL_COMMENT_BY_RATING) {
        return {...store,commentsRating: payload}
    }if (type === GET_ALL_COMMNENT) {
        return {...store,countComment: payload}
    }if (type === GET_ALL_MEDIA) {
        return {...store,countMedia: payload}
    }if (type === GET_ALL_FEEDBACK_MESSAGE) {
        return {...store,feedbackMessage: payload}
    }if (type === GET_ALL_TOTAL_PAGE) {
        return {...store,totalPage: payload}
    }if (type === GET_AVERAGE_RATING) {
        return {...store,averageRating: payload}
    }if (type === UPDATE_STATUS_SHOW_FEEDBACK_MESSAGE) {
        console.log("đi vào trong này");
        return {
            ...store,
            feedbacks: store.feedbacks.map(feedback => 
              feedback.feedbackId === payload.feedbackId
                ? { ...feedback, status: payload.status }
                : feedback
            )
          };
    }else {
        return store
    }
}
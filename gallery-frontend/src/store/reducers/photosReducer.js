import {FETCH_PHOTOS_FAILURE, FETCH_PHOTOS_SUCCESS} from "../actions /photosAction";

const initialState = {
  photos: [],
  error: null
};

const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_SUCCESS:
            return {...state, photos: action.photo};
        case FETCH_PHOTOS_FAILURE:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default photosReducer
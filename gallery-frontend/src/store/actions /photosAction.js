import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

export const fetchPhotosSuccess = photo => ({type: FETCH_PHOTOS_SUCCESS, photo});
export const fetchPhotosFailure = error => ({type: FETCH_PHOTOS_FAILURE, error});

export const getPhotos = userId => {
  return async dispatch => {
      try {
          let response;
          if (userId) {
              response = await axiosApi.get('/photos?user=' + userId);
          } else {
              response = await axiosApi.get('/photos');
          }

          dispatch(fetchPhotosSuccess(response.data))
      }catch (error) {
          dispatch(fetchPhotosFailure(error))
      }
  }
};

export const newPhoto = photoData => {
    return async dispatch => {
        try {
            await axiosApi.post('/photos', photoData);
            dispatch(fetchPhotosSuccess());
            dispatch(push('/'))
        } catch (error) {
            dispatch(fetchPhotosFailure(error.response.data))
        }
    }
};

export const deletePhoto = photoId => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.user;
            await axiosApi.delete('/photos/' + photoId);
            dispatch(fetchPhotosSuccess());
            dispatch(getPhotos(user._id))
        } catch (error) {
            dispatch(fetchPhotosFailure(error))
        }
    }
};
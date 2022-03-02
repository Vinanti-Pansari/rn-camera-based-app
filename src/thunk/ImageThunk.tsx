import {
  UpdateFavoritePhotoArray,
  updatePhotosArray,
} from '../reduxStorage/slice/ImageSlice';

export const updateImageIntoPhotoArray =
  (updatedPhotoData: any[]) => async (dispatch: any) => {
    dispatch(updatePhotosArray(updatedPhotoData));
  };

export const updateArrayForFavImages =
  (updatedPhotoData: any[]) => async (dispatch: any) => {
    dispatch(UpdateFavoritePhotoArray(updatedPhotoData));
  };

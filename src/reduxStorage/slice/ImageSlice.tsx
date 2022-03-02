import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {photoType, titleType} from '../../utils/mockData/TilesData';

type PhotoState = {
  photosData: any[];
  favPhotos: any[];
};

export const initialState: PhotoState = {
  photosData: photoType,
  favPhotos: [],
};

export const photoAction = createSlice({
  name: 'photoAction',
  initialState,
  reducers: {
    updatePhotosArray: (state, action: PayloadAction<any[]>) => {
      state.photosData = action.payload;
    },
    UpdateFavoritePhotoArray: (state, action: PayloadAction<any[]>) => {
      state.favPhotos = action.payload;
    },
  },
});

export const {updatePhotosArray, UpdateFavoritePhotoArray} =
  photoAction.actions;
export default photoAction.reducer;

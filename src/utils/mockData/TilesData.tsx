export const titleType = {
  GALLERY: 'Gallery',
  FAVORITE: 'Favorite',
  LANDSCAP: 'Landscape',
  PORTRAIT: 'Portrait',
  CANCEL: 'Cancel',
  ADD: 'Add',
  SAVE: 'Save',
  CAMERA: 'Camera',
  OTHER: 'Other',
};

export const dasboardTiles = [
  {
    key: titleType.GALLERY, //which can be differ and unique one
    text: titleType.GALLERY,
  },
  {
    key: titleType.FAVORITE,
    text: titleType.FAVORITE,
  },
];

export const photoType = [
  {
    title: titleType.LANDSCAP,
    photos: [],
    writable: true,
  },
  {
    title: titleType.PORTRAIT,
    photos: [],
    writable: true,
  },
];
export const buttonData = [
  {
    key: titleType.CANCEL,
    title: titleType.CANCEL,
  },
  {
    key: titleType.SAVE,
    title: titleType.ADD,
  },
];

export const cameraOptions = [
  titleType.CAMERA,
  titleType.GALLERY,
  titleType.CANCEL,
];

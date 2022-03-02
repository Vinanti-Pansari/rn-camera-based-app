import React, {useState, useEffect, useCallback} from 'react';
import {Text, StyleSheet, View, Alert, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {labels} from '../../utils/constant/Labels';
import {cameraOptions, titleType} from '../../utils/mockData/TilesData';
import ScreenContent from '../../component/atoms/screenContent/ScreenContainer';
import AppHeader from '../../navigation/components/AppHeader';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from '../../component/atoms/ImageView/ImageView';
import {useAppDispatch, useAppSelector} from '../../reduxStorage/config/Hooks';
import {
  updateArrayForFavImages,
  updateImageIntoPhotoArray,
} from '../../thunk/ImageThunk';

const PhotoGallery = (route: any) => {
  const {
    route: {
      params: {key, photos},
    },
  } = route;
  const dispatch = useAppDispatch();
  const {photosData, favPhotos} = useAppSelector(state => state.imageReducer);

  const [displayActionSheet, openActionSheet] = useState(false);
  const [photoArray, setPhotos] = useState(() => {
    let selectedTypeOfArray = photosData.find(obj => obj.title === key);
    return selectedTypeOfArray.photos;
  });
  const [favPhotoArray, setFavPhotos] = useState(
    JSON.parse(JSON.stringify(favPhotos)),
  );

  /**
   *
   * @param index Method to perform actionsheet operations
   * @returns
   */
  const handleActionSheet = (index: number) => {
    switch (index) {
      case 0:
        return Alert.alert('Sorry!!', `Don't have camera on my simultor`, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      case 1:
        optionGalleryPicker();
      default:
        openActionSheet(false);
    }
  };

  /**
   *
   * @returns set dimension for image picker as per their mode
   */
  const setPickerDimesionConfiguration = () => {
    switch (key) {
      case titleType.LANDSCAP:
        return {height: 200, width: 500};
      case titleType.PORTRAIT:
        return {width: 500, height: 600};
      default:
        return {width: 500, height: 500};
    }
  };

  /**
   *
   * @param imageData Method to update photos data inside the phototpe array as per the selected type
   */
  const updatePhotosArray = (imageData: any) => {
    let clonedPhotoArray = JSON.parse(JSON.stringify(photosData));
    clonedPhotoArray.map((data: any) => {
      if (data.title === key) {
        data.photos = imageData;
      }
      return data;
    });
    dispatch(updateImageIntoPhotoArray(clonedPhotoArray));
  };

  /**
   * Method to open a gallery
   */
  const optionGalleryPicker = () => {
    const commonConfig = {
      multiple: false,
      cropping: true,
      includeBase64: true,
    };
    openActionSheet(false);
    ImagePicker.openPicker({
      ...setPickerDimesionConfiguration(),
      ...commonConfig,
    }).then(image => {
      image.isFav = false;
      setPhotos([...photoArray, {...image}]);
      updatePhotosArray([...photoArray, {...image}]);
    });
  };
  /**
   *
   * @param item Method to update the fav status of photo
   * @param index
   */
  const toggleFav = (item: any, index: number) => {
    item.isFav = true;
    let updateFavData = [];
    updateFavData = [...favPhotoArray, {...item}];
    setFavPhotos(updateFavData);
    dispatch(updateArrayForFavImages(updateFavData));
    updateExistingPhotoArray(item);
  };

  /**
   *
   * @param item Updated redux photo data with respect to updated flag
   */
  const updateExistingPhotoArray = (item: any) => {
    let clonedPhotoArray = JSON.parse(JSON.stringify(photosData));
    clonedPhotoArray.map((data: any) => {
      let photoIndex = data.photos.findIndex(
        obj => (obj.filename = item.filename),
      );
      if (photoIndex !== -1) {
        data.photos[photoIndex].isFav = true;
      }
    });
    dispatch(updateImageIntoPhotoArray(clonedPhotoArray));
  };

  return (
    <ScreenContent>
      <AppHeader
        title={labels.PHOTOS}
        displayBackButton={true}
        displayLeftButton={true}
        addNewCategory={() => openActionSheet(true)}
      />
      <FlatList
        data={photoArray}
        renderItem={(item: any) => {
          const {
            item: {data, isFav},
            index,
          } = item;
          return (
            <ImageView
              toggleFav={() => toggleFav(item.item, index)}
              base64Image={data}
              isFav={isFav}
              keyVal={key}
            />
          );
        }}
        keyExtractor={item => item?.id}
      />
      {displayActionSheet && (
        <View style={styles.actionSheetBlock}>
          {cameraOptions.map((actionSheetData: string, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => handleActionSheet(index)}
                style={styles.optionView}>
                <Text>{actionSheetData}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScreenContent>
  );
};
export default PhotoGallery;

const styles = StyleSheet.create({
  actionSheetBlock: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fafafa',
    height: '20%',
  },
  optionView: {
    height: 50,
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

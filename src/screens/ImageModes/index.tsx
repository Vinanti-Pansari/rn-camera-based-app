import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useOrientation} from '../../customHooks/UseOrientation';
import {adaptiveDynamicStyle} from '../../adaptiveContext/AdaptiveStylesheet';
import {buttonData, titleType} from '../../utils/mockData/TilesData';
import {labels} from '../../utils/constant/Labels';
import ScreenContent from '../../component/atoms/screenContent/ScreenContainer';
import Card from '../../component/atoms/cards/Card';
import AppHeader from '../../navigation/components/AppHeader';
import CustomTextInput from '../../component/atoms/textInput/CustomTextInput';
import * as Navigation from '../../navigation/NevigationRef';
import {AppColors} from '../../StyleUtils/colors/AppColors';
import {useAppDispatch, useAppSelector} from '../../reduxStorage/config/Hooks';
import {updateImageIntoPhotoArray} from '../../thunk/ImageThunk';
import {errLabels} from '../../utils/constant/Errors';

export const StyleContext = React.createContext();
const PhotoModes = () => {
  const {photosData} = useAppSelector(state => state.imageReducer);
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const orientation = useOrientation();
  const dynamic = adaptiveDynamicStyle(orientation);
  const [photoFolders, setFolders] = useState(photosData);
  const [errMsg, setErrMsg] = useState('');
  const [displyAddCategory, setAddCategoryFlag] = useState(false);

  useEffect(() => {
    if (
      inputRef?.current?.value !== undefined &&
      inputRef?.current?.value !== ''
    ) {
      setErrMsg('');
    }
  }, [errMsg]);

  const addCaterory = () => {
    if (
      inputRef?.current?.value === '' ||
      inputRef?.current?.value === undefined
    ) {
      setErrMsg(errLabels.SELECT_CATEGORY);
    } else {
      setErrMsg('');
      let updatedPhotoData = [
        ...photoFolders,
        ...[{title: inputRef.current.value, photos: []}],
      ];
      setFolders(updatedPhotoData);
      dispatch(updateImageIntoPhotoArray(updatedPhotoData));
      setAddCategoryFlag(false);
    }
  };

  const renderNewCategoryBlock = () => {
    return (
      <View style={styles.inputBlock}>
        <View style={dynamic.inputBlock}>
          <CustomTextInput
            inputRef={inputRef}
            placeHolder={labels.ADD_CATEGORY_HERE}
            label={labels.ADD_CATEGORY}
            errMsg={errMsg}
          />
          <View style={styles.btnView}>
            {buttonData.map((btnObj: any) => {
              return (
                <Text
                  onPress={() =>
                    btnObj.key == titleType.SAVE
                      ? addCaterory()
                      : setAddCategoryFlag(false)
                  }
                  style={[
                    styles.btnTitle,
                    {
                      color:
                        btnObj.key == titleType.SAVE
                          ? AppColors.darkGreen
                          : AppColors.red,
                    },
                  ]}>
                  {btnObj.title}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const addNewCategoryBlock = useCallback(() => {
    setAddCategoryFlag(true);
  }, [displyAddCategory]);
  return (
    <StyleContext.Provider value={dynamic}>
      <ScreenContent>
        <AppHeader
          title={labels.GALLERY}
          displayBackButton={true}
          displayLeftButton={true}
          addNewCategory={() => addNewCategoryBlock()}
        />

        <View style={styles.middleContainerView}>
          <FlatList
            data={photoFolders}
            renderItem={(item: any) => {
              const {
                item: {title, photos},
              } = item;
              return (
                <Card
                  onPress={() =>
                    Navigation.navigate('PhotoGallery', {
                      key: title,
                    })
                  }
                  listData={item.item}
                />
              );
            }}
            keyExtractor={item => item?.id}
          />
        </View>
        {displyAddCategory && renderNewCategoryBlock()}
      </ScreenContent>
    </StyleContext.Provider>
  );
};
export default PhotoModes;
const styles = StyleSheet.create({
  middleContainerView: {
    flex: 1,
    padding: 20,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    paddingVertical: 10,
  },
  inputBlock: {
    position: 'absolute',
    alignSelf: 'center',
    aliignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0.5,0.5,0.5,0.5)',
  },
  btnView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

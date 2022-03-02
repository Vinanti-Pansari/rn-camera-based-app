import React, {useState} from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import ImageView from '../../component/atoms/ImageView/ImageView';
import ScreenContent from '../../component/atoms/screenContent/ScreenContainer';
import AppHeader from '../../navigation/components/AppHeader';
import {useAppSelector} from '../../reduxStorage/config/Hooks';
import {labels} from '../../utils/constant/Labels';
import {titleType} from '../../utils/mockData/TilesData';

const FavoriteGallery = () => {
  const {favPhotos} = useAppSelector(state => state.imageReducer);
  return (
    <ScreenContent>
      <AppHeader
        title={labels.FAVORITE}
        displayBackButton={true}
        displayLeftButton={false}
      />
      <FlatList
        data={favPhotos}
        renderItem={(item: any) => {
          const {
            item: {data, isFav},
            index,
          } = item;
          return (
            <ImageView
              keyVal={
                item.height > item.width
                  ? titleType.PORTRAIT
                  : titleType.LANDSCAP
              }
              base64Image={data}
              isFav={isFav}
            />
          );
        }}
        keyExtractor={item => item?.id}
      />
    </ScreenContent>
  );
};
export default FavoriteGallery;

import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppColors} from '../../../StyleUtils/colors/AppColors';
import {titleType} from '../../../utils/mockData/TilesData';

interface imageProps {
  base64Image: string;
  keyVal?: any;
  toggleFav?: () => void;
  isFav?: boolean;
}

/**
 *
 * @param isFavImage Method to update dynamic styles as per the favotite flag
 * @returns
 */
const updateDynamicStyle = (isFavImage: boolean) => {
  return {backgroundColor: isFavImage ? AppColors.red : AppColors.Edward};
};

const ImageView = ({base64Image, keyVal, toggleFav, isFav}: imageProps) => {
  const [isFavImage, setIsFav] = useState(isFav);
  return (
    <View style={styles.imageOuterView}>
      <TouchableOpacity
        disabled={isFavImage}
        onPress={() => {
          setIsFav(true);
          toggleFav && toggleFav();
        }}>
        <View
          style={[styles.favView, isFavImage && updateDynamicStyle(isFavImage)]}
        />
      </TouchableOpacity>
      <Image
        style={[
          {alignSelf: 'center'},
          keyVal === titleType.LANDSCAP
            ? styles.landscapImageView
            : keyVal === titleType.PORTRAIT
            ? styles.potraitImageView
            : styles.otherImageView,
        ]}
        source={{uri: `data:image/jpeg;base64,${base64Image}`}}
        resizeMode={'contain'}
      />
    </View>
  );
};
export default ImageView;
const styles = StyleSheet.create({
  potraitImageView: {
    height: 300,
    width: '70%',
  },
  otherImageView: {
    height: 380,
    width: '100%',
  },
  landscapImageView: {
    height: 200,
    width: '90%',
  },
  imageOuterView: {
    marginTop: 15,
    backgroundColor: AppColors.transparent,
    width: '90%',
    alignSelf: 'center',
  },
  favView: {
    height: 20,
    width: 20,
    backgroundColor: '#ccc',
    alignSelf: 'flex-end',
    margin: 10,
  },
});

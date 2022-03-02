import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {StyleContext} from '../../../screens/Home';
import GridPhotos from '../../../assets/svg/gridphotos.svg';
import FavStudio from '../../../assets/svg/studio.svg';
import Favorite from '../../../assets/svg/favorite.svg';
import {titleType} from '../../../utils/mockData/TilesData';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Navigation from '../../../navigation/NevigationRef';
import {AppRoutes} from '../../../navigation/Routes';
interface RoundTileProps {
  tileObj: object;
}

const RoundTile = ({tileObj}: RoundTileProps) => {
  const dynamicStyles = useContext(StyleContext);
  return (
    <TouchableOpacity
      onPress={() => {
        Navigation.navigate(
          tileObj.key === titleType.GALLERY
            ? AppRoutes.PhotoModes
            : AppRoutes.FavoriteGallery,
          {},
        );
      }}
      style={[styles.circleView, dynamicStyles?.circleView]}>
      {tileObj.key === titleType.GALLERY ? (
        <GridPhotos width={100} height={100} />
      ) : (
        <>
          <FavStudio width={100} height={100} />
          <Favorite style={styles.favIconView} width={40} height={40} />
        </>
      )}

      <Text style={styles.titleStyle}>{tileObj.text}</Text>
    </TouchableOpacity>
  );
};
export default RoundTile;

const styles = StyleSheet.create({
  circleView: {
    backgroundColor: 'rgba(116, 177, 182, 1)',
    borderColor: '#ccc  ',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  favIconView: {
    position: 'absolute',
    bottom: 50,
  },
});

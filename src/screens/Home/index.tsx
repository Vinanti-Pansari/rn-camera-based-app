import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppHeader from '../../navigation/components/AppHeader';
import {useOrientation} from '../../customHooks/UseOrientation';
import {adaptiveDynamicStyle} from '../../adaptiveContext/AdaptiveStylesheet';
import {dasboardTiles, titleType} from '../../utils/mockData/TilesData';
import RoundTile from '../../component/atoms/tiles/RoundTile';
import {labels} from '../../utils/constant/Labels';
import ScreenContent from '../../component/atoms/screenContent/ScreenContainer';
import {AppColors} from '../../StyleUtils/colors/AppColors';

export const StyleContext = React.createContext();
const Home = () => {
  const orientation = useOrientation();
  const dynamic = adaptiveDynamicStyle(orientation);
  return (
    <StyleContext.Provider value={dynamic}>
      <ScreenContent>
        <AppHeader title={'Welcome'} displayBackButton={false} />
        <Text style={styles.titleStyle}>{labels.WELCOME_USER}</Text>

        <View style={[styles.middleContainerView, dynamic.imageContainer]}>
          {dasboardTiles.map((tileData: any) => {
            return <RoundTile tileObj={tileData} />;
          })}
        </View>
      </ScreenContent>
    </StyleContext.Provider>
  );
};
export default Home;
const styles = StyleSheet.create({
  middleContainerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: AppColors.black,
    marginTop: 20,
  },
});

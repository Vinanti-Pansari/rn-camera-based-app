import React, {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleContext} from '../../../screens/ImageModes';
import {AppColors} from '../../../StyleUtils/colors/AppColors';

interface cardProps {
  listData: object;
  onPress: () => void;
}

const Card = ({listData, onPress}: cardProps) => {
  const dynamicStyles = useContext(StyleContext);
  return (
    <TouchableOpacity onPress={onPress} style={dynamicStyles?.cardBlock}>
      <Text style={styles.titleStyle}>{listData.title}</Text>
    </TouchableOpacity>
  );
};
export default Card;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: AppColors.black,
  },
});

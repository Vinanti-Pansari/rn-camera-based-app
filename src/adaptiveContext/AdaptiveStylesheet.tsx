import {AppColors} from '../StyleUtils/colors/AppColors';

export const adaptiveDynamicStyle = (orientation: any) => {
  const width = orientation.isPotrait ? orientation.width : orientation.height;
  const height = orientation.isPotrait ? orientation.height : orientation.width;
  let dynamicStyles = {
    circleView: {
      height: width * 0.4,
      width: width * 0.4,
      borderRadius: width * 0.2,
      borderWidth: 1,
    },
    imageContainer: {
      flexDirection: !orientation.isPotrait && 'row',
      justifyContent: 'space-around',
    },
    cardBlock: {
      width: width * 0.9,
      height: height * 0.08,
      marginVertical: 10,
      backgroundColor: AppColors.sandyBrown,
      borderRadius: 4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputBlock: {
      width: width * 0.9,
      borderWidth: 1,
      borderColor: AppColors.silverSand,
      borderRadius: 4,
      padding: 20,
      alignSelf: 'center',
      backgroundColor: AppColors.white,
    },
  };
  return dynamicStyles;
};

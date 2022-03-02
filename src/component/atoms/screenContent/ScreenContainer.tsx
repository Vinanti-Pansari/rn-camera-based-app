import React from 'react';
import {ScrollView} from 'react-native';
import {screenStyle} from '../../../StyleUtils/styles/screenContentStyle';

const ScreenContent = ({children}: any) => (
  <ScrollView
    alwaysBounceVertical={false}
    style={screenStyle.mainView}
    contentContainerStyle={[screenStyle.middleContainer]}>
    {children}
  </ScrollView>
);

export default ScreenContent;

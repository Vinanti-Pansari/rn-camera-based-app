import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './NevigationRef';
import {AppRoutes} from './Routes';
import Home from '../screens/Home';
import PhotoModes from '../screens/ImageModes';
import PhotoGallery from '../screens/PhotoGallery';
import FavoriteGallery from '../screens/GalleryForFavorite';
import store from '../reduxStorage/store/Store';

const Stack = createStackNavigator();
const AppStack = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar translucent />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={AppRoutes.Home} component={Home} />
          <Stack.Screen
            name={AppRoutes.FavoriteGallery}
            component={FavoriteGallery}
          />
          <Stack.Screen
            name={AppRoutes.PhotoGallery}
            component={PhotoGallery}
          />
          <Stack.Screen name={AppRoutes.PhotoModes} component={PhotoModes} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default AppStack;

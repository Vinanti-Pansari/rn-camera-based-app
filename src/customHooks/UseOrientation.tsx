import React, {useEffect, useState} from 'react';

import {Dimensions} from 'react-native';

export const useOrientation = () => {
  const [orienattionInfo, setOrientationInfo] = useState(
    Dimensions.get('screen'),
  );
  useEffect(() => {
    const onChange = (res: any) => {
      setOrientationInfo(res.screen);
    };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return {
    ...orienattionInfo,
    isPotrait: orienattionInfo.height > orienattionInfo.width,
  };
};

import React from 'react';
import { Text  } from 'react-native';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Loader from '../screens/Loader';
import New from './New';
import Old from './Old';

export default createAppContainer(createSwitchNavigator({
  Loader: {
    screen: Loader
  },
  New: {
    screen: New
  },
  Old:{
    screen: Old
  }
}))
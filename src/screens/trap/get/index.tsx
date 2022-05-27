import {useRoute} from '@react-navigation/native';
import {TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {View} from 'ui';

export const GetTrapScreen = () => {
  const route = useRoute<TrapRoute<'set'>>();
  const id = route.params.id;

  return <View></View>;
};

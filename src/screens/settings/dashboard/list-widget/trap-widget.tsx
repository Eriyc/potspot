import React from 'react';

import {Anchor} from 'react-native-feather';
import {SectionData} from '../types';

export const TrapWidget: SectionData = {
  title: 'Tinor',
  icon: <Anchor height={24} width={24} color={'black'} />,
  data: [{external: false, label: 'Visa alla tinor', navigateTo: 'trap-list'}],
};

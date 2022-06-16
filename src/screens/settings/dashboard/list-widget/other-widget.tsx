import React from 'react';

import {Info} from 'react-native-feather';
import {SectionData} from '../types';

export const InformationWidget: SectionData = {
  title: 'Information',
  icon: <Info height={24} width={24} color={'black'} />,
  data: [
    {
      external: true,
      label: 'Regler för hummerfiske',
      navigateTo:
        'https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html',
    },
  ],
};

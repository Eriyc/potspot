import React from 'react';

import {User} from 'react-native-feather';
import {SectionData} from '../types';

export const AccountWidget: SectionData = ({
  title: 'Du',
  icon: (
    <User height={24} width={24} color={'black'} />
  ),
  data: [
    {external: false, label: 'Profil', navigateTo: 'profile'},
    {external: false, label: 'Konto', navigateTo: 'account'},
  ],
});

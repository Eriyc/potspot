import {SettingsStackParamsList} from 'navigation/settings-navigator';
import {ReactNode} from 'react';

export type SectionData = {
  title: string;
  icon: ReactNode;
  data: SectionType[];
};

export type SectionType = {
  label: string;
  navigateTo: keyof SettingsStackParamsList | string;
  external: boolean;
};

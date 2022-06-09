import {SettingsStackParamsList} from 'navigation/settings-navigator';
import {ReactNode} from 'react';

export type CustomType = {
  custom: true;
  component: ReactNode;
};
export type LinkType = {
  custom?: false;
  label: string;
  navigateTo: keyof SettingsStackParamsList | string;
  external: boolean;
};

export type SectionType = LinkType | CustomType;

export type SectionData = {
  title: string;
  icon: ReactNode;
  data: SectionType[];
};

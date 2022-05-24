import {createBox} from '@shopify/restyle';
import React from 'react';
import {ScrollView as NS} from 'react-native';
import {SafeAreaView} from './SafeAreaView';
import {Theme} from './theme';

type Props = {
  children: React.ReactNode;
};

const ScrollView =
  createBox<
    Theme,
    React.ComponentProps<typeof NS> & {children?: React.ReactNode}
  >(NS);

export const Screen = ({children}: Props) => (
  <SafeAreaView flex={1}>
    <ScrollView
      flexDirection="column"
      paddingHorizontal="m"
      keyboardShouldPersistTaps="always"
      contentContainerStyle={style}
      bg="background">
      {children}
    </ScrollView>
  </SafeAreaView>
);

const style = {flexGrow: 1};

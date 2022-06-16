import React from 'react';
import {View} from 'ui';
import {useGetState} from '../get-trap-state';
import {AmountScreen} from './amount';
import {Footer} from './common';

export const VittjaOtherFlow = () => {
  const state = useGetState();

  // crab data

  if (!state.current) {
    return <View />;
  }

  if (state.current.current === 0) {
    return <AmountScreen plural="annan fångst" singular="annan fångst" />;
  }

  return (
    <View>
      <Footer />
    </View>
  );
};

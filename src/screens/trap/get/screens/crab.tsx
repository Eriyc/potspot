import React, {useState} from 'react';
import {View} from 'ui';
import {useGetState} from '../get-trap-state';
import {AmountScreen} from './amount';
import {Footer} from './common';

export const VittjaCrabFlow = () => {
  const state = useGetState();

  // crab data
  const [gender, setGender] = useState<'male' | 'female' | undefined>();
  const [size, setSize] = useState(0);

  if (!state.current) return <View />;

  if (state.current.current === 0) {
    return <AmountScreen plural="krabbor" singular="krabba" />;
  }

  return (
    <View>
      <Footer />
    </View>
  );
};

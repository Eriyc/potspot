import React, {useState} from 'react';
import {Text, View} from 'ui';
import {Lobster, useGetState} from '../get-trap-state';
import {AmountScreen} from './amount';
import {AmountWidget} from './amount/amount-widget';
import {Button, Footer} from './common';
import {GenderWidget} from './gender-widget';

export const VittjaLobsterFlow = () => {
  const state = useGetState();

  // lobster data
  const [gender, setGender] = useState<'male' | 'female' | undefined>();
  const [carapax, setCarapax] = useState(0);

  if (!state.current) return <View />;

  if (state.current.current === 0) {
    return <AmountScreen plural="hummer" singular="hummer" />;
  }

  const goNext = () => {
    const dataIndex = state.current!.current - 1;
    const maxLength = state.current!.total - 1;
    const data = {gender, carapax, hasData: state.current!.individualData};
    if (dataIndex >= state.current!.data.length) {
      // lägg till data om den inte finns
      state.addCurrentData(data);

      // återställ för nästa skärm
      setGender(undefined);
      setCarapax(0);
    } else if (dataIndex === maxLength - 1) {
      // annars uppdatera datan
      state.editCurrentData(dataIndex, data);
    } else {
      state.editCurrentData(dataIndex, data);

      // vi vet att det finns data från nästa skärm
      // eftersom datan är inte sist i listan
      setGender(state.current!.data[dataIndex + 1].gender);
      setCarapax((state.current!.data[dataIndex + 1] as Lobster).carapax);
    }

    return true;
  };

  const goPrevious = () => {
    const item = state.current?.data[state.current.current - 2];

    if (item) {
      setCarapax((item as Lobster).carapax);
      setGender(item.gender);
    }
    return true;
  };

  return (
    <View flex={1} pb="xl">
      <View marginHorizontal="l" flex={1}>
        <Text variant="header">
          Ange data för hummer {state.current?.current}
        </Text>
        <Text variant="body">Kön</Text>
        <GenderWidget gender={gender} onGenderChange={setGender} />
      </View>
      <Footer onBack={goPrevious} onNext={goNext} />
    </View>
  );
};

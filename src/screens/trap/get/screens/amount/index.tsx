import React, {useState} from 'react';
import {Text, View} from 'ui';
import {useGetState} from '../../get-trap-state';
import {Footer, Button} from '../common';
import {AmountWidget} from './amount-widget';

type AmountProps = {
  plural: string;
  singular: string;
};
export const AmountScreen = ({plural, singular}: AmountProps) => {
  const state = useGetState();

  const [amount, selectNumber] = useState(() => state.current!.amount);
  const [individually, setIndividalley] = useState(
    state.current!.individualData,
  );

  const canGoNext = () => {
    state.setAmount(amount, individually);

    return true;
  };

  return (
    <View justifyContent="space-between" flex={1} pb="xl">
      <View flexGrow={1}>
        <View padding="l">
          <Text variant="header">Hur många {plural} fick du?</Text>
        </View>
        <AmountWidget onAmountChanged={selectNumber} value={amount} />
        <View margin="l">
          <Text variant="body">Vill du logga data för varje {singular}?</Text>
          <View flexDirection="row" mt="m">
            <Button
              bg={individually ? 'lightblue' : undefined}
              onPress={() => setIndividalley(true)}>
              Ja
            </Button>
            <Button
              bg={!individually ? 'lightblue' : undefined}
              onPress={() => setIndividalley(false)}>
              Nej
            </Button>
          </View>
        </View>
      </View>
      <Footer onNext={canGoNext} />
    </View>
  );
};

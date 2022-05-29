import {useRoute} from '@react-navigation/native';
import {useVittjaTrap} from 'api/trap';
import {TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, theme, View} from 'ui';
import {Crab, Lobster, Other, useGetState} from '../get-trap-state';
import {Button, Footer} from './common';

const CrabInfo = ({crab}: {crab: Crab}) => {
  return (
    <View>
      <Text>
        - {crab.gender || 'Okänt'}, {crab.size}
      </Text>
    </View>
  );
};
const LobsterInfo = ({lobster}: {lobster: Lobster}) => {
  return (
    <View>
      <Text>
        - {lobster.gender || 'Okänt'}, {lobster.carapax}
      </Text>
    </View>
  );
};
const OtherInfo = ({other}: {other: Other}) => {
  return (
    <View>
      <Text>- {other.gender || 'Okänt'}</Text>
    </View>
  );
};

export const CatchSummary = () => {
  const route = useRoute<TrapRoute<'get'>>();
  const {data, current, complete} = useGetState();

  const mutation = useVittjaTrap(route.params.id);

  const goPrevious = () => {
    return true;
  };

  const goNext = () => {
    complete();
    mutation.mutate({data});

    return false;
  };

  const restart = () => {
    complete();
  };

  return (
    <View flex={1} pb="xl">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: theme.spacing.l,
        }}>
        <Text variant="header">Sammanfattning</Text>
        <Text>Ny data</Text>
        <Text fontWeight="bold">
          {current?.amount}x {current?.id}
        </Text>
        {Object.values(current!.data).map(
          (c, i) =>
            c.hasData && (
              <View key={i}>
                {current?.id === 'crab' ? (
                  <CrabInfo crab={c as Crab} />
                ) : current?.id === 'lobster' ? (
                  <LobsterInfo lobster={c as Lobster} />
                ) : (
                  <OtherInfo other={c as Other} />
                )}
              </View>
            ),
        )}
        {Object.entries(data).length > 0 && (
          <>
            <Text>Övrig data</Text>
            {Object.entries(data).map(([key, c]) => (
              <View key={key}>
                <Text fontWeight="bold">
                  {c.amount}x {c.type}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      <View flexDirection="row" marginHorizontal="l" mb="s">
        <Button onPress={restart}>Lägg till fångst</Button>
      </View>
      <Footer onBack={goPrevious} onNext={goNext} nextLabel="Avsluta" />
    </View>
  );
};

import {useRoute} from '@react-navigation/native';
import {Trap, useSingleTrap} from 'api/trap';
import {TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {ScrollView} from 'react-native';
import {Screen, Text, View} from 'ui';
import {TrapAccessWidget} from './access-widget';
import {ActionsWidget} from './actions-widget';
import {BaitWidget} from './bait-widget';
import {DetailsMapWidget} from './map-widget';

export const TrapDetails = () => {
  const {
    params: {id},
  } = useRoute<TrapRoute<'details'>>();

  const {data} = useSingleTrap(id);

  if (!data) {
    return <View />;
  }

  const trap = data as Trap;
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <DetailsMapWidget coordinates={trap.pos} />
      <View p="l">
        <Text variant="header">{trap.displayname}</Text>

        {trap.created_by && (
          <TrapAccessWidget id={trap.id} created_by={trap.created_by} />
        )}

        {trap.bait && <BaitWidget baitId={trap.bait} />}

        <ActionsWidget id={id} />
      </View>
    </ScrollView>
  );
};

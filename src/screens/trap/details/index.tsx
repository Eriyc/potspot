import {useRoute} from '@react-navigation/native';
import {Trap, useSingleTrap} from 'api/trap';
import {TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'ui';
import {TrapAccessWidget} from './access-widget';
import {ActionsWidget} from './actions-widget';
import {BaitWidget} from './bait-widget';
import {DetailsMapWidget} from './map-widget';

import distance from '@turf/distance';
import {useLocation} from 'core/use-location';

export const TrapDetails = () => {
  const {
    params: {id},
  } = useRoute<TrapRoute<'details'>>();
  const [pos, granted] = useLocation();
  const {data} = useSingleTrap(id);

  if (!data) {
    return <View />;
  }

  const trap = data as Trap;

  const d = distance(pos, trap.pos);

  return (
    <ScrollView contentContainerStyle={grow}>
      <DetailsMapWidget coordinates={trap.pos} />
      <View p="l">
        <View mb="m">
          <Text variant="header">{trap.displayname}</Text>
          {granted && <Text color="grey2">{Math.floor(d)} km bort</Text>}
        </View>
        {trap.created_by && (
          <TrapAccessWidget id={trap.id} created_by={trap.created_by} />
        )}

        {trap.bait && <BaitWidget baitId={trap.bait} />}

        <ActionsWidget id={id} in_use={trap.in_use} />
      </View>
    </ScrollView>
  );
};

const grow = {flexGrow: 1};

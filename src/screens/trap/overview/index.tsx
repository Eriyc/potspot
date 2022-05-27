import {useAllTraps} from 'api/trap';
import React from 'react';
import {View} from 'ui';
import {FullTrapMap} from './full-map';
import {TrapsWidget} from './traps-widget';

const TrapOverviewScreen = () => {
  const {data} = useAllTraps();

  return (
    <View flex={1}>
      <FullTrapMap traps={data} />
      <TrapsWidget traps={data} />
    </View>
  );
};

export {TrapOverviewScreen};

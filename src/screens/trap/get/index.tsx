import React, {useEffect} from 'react';
import {View} from 'ui';
import {GetAvalibleCatchesIds, useGetState} from './get-trap-state';
import {CatchSummary} from './screens/catch-summary';
import {VittjaCrabFlow} from './screens/crab';
import {VittjaLobsterFlow} from './screens/lobster';
import {VittjaOtherFlow} from './screens/other';
import {PickCatchScreen} from './screens/pick-catch';

const screens = [<PickCatchScreen />];
const flows: Record<GetAvalibleCatchesIds, Element> = {
  lobster: <VittjaLobsterFlow />,
  crab: <VittjaCrabFlow />,
  other: <VittjaOtherFlow />,
};

export const GetTrapScreen = () => {
  const getState = useGetState();

  useEffect(() => {
    return () => {
      getState.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (getState.current) {
    const isLast = getState.current.total === getState.current.current;

    if (isLast) {
      return <CatchSummary />;
    }

    return <View flex={1}>{flows[getState.current.id]}</View>;
  }

  return <View flex={1}>{screens[0]}</View>;
};

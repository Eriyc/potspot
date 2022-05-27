import {useBait} from 'api/bait';
import React from 'react';
import {Text, View} from 'ui';

type BaitWidgetProps = {
  baitId: number;
};
export const BaitWidget = ({baitId}: BaitWidgetProps) => {
  const {data} = useBait(baitId);

  return (
    <View>
      <Text>Nuvarande bete: {data ? data.name : 'laddar...'}</Text>
    </View>
  );
};

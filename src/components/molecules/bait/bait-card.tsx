import React, {FC} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  Pressable,
} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components';

import {Bait} from '@/types/bait';

type BaitCardProps = {
  bait: Bait;
  onPress: (event: GestureResponderEvent) => void;
  index?: number;
  selected: boolean;
};

const BaitCard: FC<BaitCardProps> = ({bait, onPress, selected}) => {
  const tw = useTailwind();
  return (
    <Pressable
      disabled={selected}
      onPress={onPress}
      android_ripple={{borderless: false}}
      style={{
        ...tw(
          'rounded-md overflow-hidden flex flex-col items-center justify-center bg-white p-2 flex-1 m-2 h-40',
        ),
        ...{maxWidth: Dimensions.get('screen').width * 0.5},
      }}>
      {bait.image_uri && (
        <Image
          height={16}
          width={16}
          source={{uri: bait.image_uri, height: 64, width: 64}}
        />
      )}
      <Text>
        {bait.name} {selected && '(vald)'}
      </Text>
    </Pressable>
  );
};

export {BaitCard};

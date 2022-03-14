import React, {FC} from 'react';
import {GestureResponderEvent, Image, Pressable} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

import {Bait} from '../types';

type BaitCardProps = {
  bait: Bait;
  onPress: (event: GestureResponderEvent) => void;
  index?: number;
  selected: boolean;
};

const BaitCard: FC<BaitCardProps> = ({bait, onPress, selected}) => {
  return (
    <Pressable
      disabled={selected}
      onPress={onPress}
      android_ripple={{borderless: false}}
      style={() => ({
        ...tw.style(
          'rounded-md overflow-hidden flex flex-col items-center justify-center bg-white p-2 shadow-sm flex-1 max-w-1/2 m-2 h-40s',
        ),
      })}>
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

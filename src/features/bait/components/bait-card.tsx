import React, {FC} from 'react';
import {GestureResponderEvent, Image, Pressable} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

import {Bait} from '../types';

type BaitCardProps = {
  bait: Bait;
  onPress: (event: GestureResponderEvent) => void;
};

const BaitCard: FC<BaitCardProps> = ({bait, onPress}) => {
  return (
    <Pressable onPress={onPress} style={tw.style('rounded-md shadow-md')}>
      {bait.image_uri && <Image source={{uri: bait.image_uri}} />}
      <Text>{bait.name}</Text>
    </Pressable>
  );
};

export {BaitCard};

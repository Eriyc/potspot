import React, {useEffect} from 'react';
import {Pressable, View} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

interface ProfileCardProps {
  profileId: string;
}

export const ProfileCard = ({profileId}: ProfileCardProps) => {
  useEffect(() => {}, []);

  return (
    <Pressable style={tw.style('py-2 flex flex-row items-center')}>
      <View style={tw.style('w-8 h-8 rounded-full bg-red-400 mr-4')} />
      <Text>{profileId}</Text>
    </Pressable>
  );
};

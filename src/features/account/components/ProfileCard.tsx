import React, {memo} from 'react';
import {Pressable, View} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

import {useProfile} from '../hooks/useProfile';

interface ProfileCardProps {
  profile: string;
}

export const ProfileCard = memo(({profile}: ProfileCardProps) => {
  const {data: user} = useProfile(profile);

  if (!user) return <View />;

  return (
    <Pressable style={tw.style('py-2 flex flex-row items-center')}>
      <View style={tw.style('w-8 h-8 rounded-full bg-red-400 mr-4')} />
      <Text>{user.username}</Text>
    </Pressable>
  );
});

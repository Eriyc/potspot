import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';

import {useProfile} from '@/hooks/account';

import {Text} from '@/components';

interface ProfileCardProps {
  profile: string;
}

export const ProfileCard = memo(({profile}: ProfileCardProps) => {
  const {data: user} = useProfile(profile);
  const tw = useTailwind();

  if (!user) return <View />;

  return (
    <Pressable style={tw('py-2 flex flex-row items-center')}>
      <View style={tw('w-8 h-8 rounded-full bg-red-400 mr-4')} />
      <Text>{user.username}</Text>
    </Pressable>
  );
});

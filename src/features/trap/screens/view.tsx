import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Button, View} from 'react-native';

import {Text} from '@/components/Text';

import {ProfileCard} from '@/features/account/components/ProfileCard';
import {Bait, CurrentBait, useChangeBait} from '@/features/bait';
import tw from '@/utils/tailwind';

import {useTrap} from '../hooks/useTrap';
import {TrapNavigation, ViewTrapRoute} from '../navigator';

const ViewTrapScreen = () => {
  const {params} = useRoute<ViewTrapRoute>();
  const {data: trap, isLoading} = useTrap(params.id);
  const changeBaitMutation = useChangeBait();

  const navigation = useNavigation<TrapNavigation>();

  const vittjaCallback = useCallback(() => {
    navigation.navigate('vittja', {id: params.id});
  }, [navigation, params.id]);

  const setCallback = useCallback(() => {
    navigation.navigate('set', {id: params.id});
  }, [navigation, params.id]);

  const handleBaitChange = (bait: Bait) => {
    changeBaitMutation.mutate({bait, trapId: params.id});
  };

  if (isLoading) {
    return (
      <View>
        <Text>Laddar...</Text>
      </View>
    );
  }

  if (!trap) return <View />;

  return (
    <View>
      <View style={tw`h-[12rem] bg-red-500`} />
      <View style={tw.style('p-4')}>
        <Text style={tw`text-lg font-bold`}>{trap.displayname}</Text>
        <CurrentBait
          onBaitChange={handleBaitChange}
          id={changeBaitMutation.data?.bait || trap.bait}
        />
        <Text>Status: {trap.in_use ? 'I vattnet' : 'Inte i vattnet'}</Text>
      </View>
      <View style={tw.style('p-4')}>
        {trap.in_use ? (
          <Button title="Vittja" onPress={vittjaCallback} />
        ) : (
          <Button title="Sätt" onPress={setCallback} />
        )}
      </View>

      <View style={tw.style('p-4')}>
        <Text>Ägare</Text>
        <ProfileCard profile={trap.created_by} />
      </View>
    </View>
  );
};

export {ViewTrapScreen};

import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Button, View} from 'react-native';

import {Text} from '@/components/Text';

import {ProfileCard} from '@/features/account/components/ProfileCard';
import {CurrentBait} from '@/features/bait/components/current-bait';
import {useMst} from '@/store';
import tw from '@/utils/tailwind';

import {TrapRoute} from '../navigator';

const ViewTrapScreen = observer(() => {
  const {trapStore} = useMst();
  const navigation = useNavigation<TrapRoute>();

  const selected = trapStore.selected;

  const vittjaCallback = useCallback(() => {
    navigation.navigate('vittja');
  }, [navigation]);

  const setCallback = useCallback(() => {
    navigation.navigate('set');
  }, [navigation]);

  if (!selected) {
    return (
      <View>
        <Text>Laddar...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={tw`h-[12rem] bg-red-500`} />
      <View style={tw.style('p-4')}>
        <Text style={tw`text-lg font-bold`}>{selected.displayname}</Text>
        <CurrentBait id={selected.bait} />
        <Text>Status: {selected.in_use ? 'I vattnet' : 'Inte i vattnet'}</Text>
      </View>
      <View style={tw.style('p-4')}>
        {selected.in_use ? (
          <Button title="Vittja" onPress={vittjaCallback} />
        ) : (
          <Button title="Sätt" onPress={setCallback} />
        )}
      </View>

      <View style={tw.style('p-4')}>
        <Text>Ägare</Text>
        <ProfileCard profileId={selected.created_by} />
      </View>
    </View>
  );
});

export {ViewTrapScreen};

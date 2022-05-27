import {useNavigation, useRoute} from '@react-navigation/native';
import {TrapNavigationProp, TrapRoute} from 'navigation/trap-navigator';
import React, {useState} from 'react';
import {Pressable, Text, View} from 'ui';

export const PickBaitModal = () => {
  const route = useRoute<TrapRoute<'pick-bait-modal'>>();
  const navigation = useNavigation<TrapNavigationProp<'pick-bait-modal'>>();

  const [bait, setBait] = useState(route.params.bait || null);

  const returnValue = () => {
    if (!bait) return;

    navigation.navigate({
      name: route.params.returnTo,
      params: {bait},
      merge: true,
    } as any);
  };

  return (
    <View>
      <Pressable p="m" onPress={() => setBait(10)}>
        <Text>ändra</Text>
      </Pressable>
      <Pressable p="m" onPress={returnValue}>
        <Text>test</Text>
      </Pressable>
    </View>
  );
};

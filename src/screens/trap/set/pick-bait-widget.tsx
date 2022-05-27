import {useNavigation} from '@react-navigation/native';
import {useBait} from 'api/bait';
import {TrapNavigationProp, TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {Pressable, Text, View} from 'ui';

type PickBaitWidgetProps = {
  bait: number;
};

export const PickBaitWidget = (props: PickBaitWidgetProps) => {
  const {data: bait} = useBait(props.bait);
  const navigation = useNavigation<TrapNavigationProp<'set'>>();
  const openModal = () => {
    navigation.navigate('pick-bait-modal', {bait: props.bait, returnTo: 'set'});
  };

  return (
    <View paddingHorizontal="l">
      <Text variant="header">Välj bete</Text>
      <View flexDirection="row" alignItems="center">
        <View flex={1}>
          <Text>Bete: {bait?.name}</Text>
        </View>
        <View borderWidth={1} borderRadius={4} overflow="hidden">
          <Pressable
            padding="m"
            android_ripple={{borderless: true}}
            onPress={openModal}>
            <Text>Ändra bete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

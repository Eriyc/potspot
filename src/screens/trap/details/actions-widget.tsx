import {NavigationProp, useNavigation} from '@react-navigation/native';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import React from 'react';
import {Pressable, Text, View} from 'ui';

type ActionsWidgetProps = {
  id: number;
};
export const ActionsWidget = (props: ActionsWidgetProps) => {
  const navigation = useNavigation<TrapNavigationProp<'details'>>();

  const gotoGet = () => {
    navigation.navigate('get', {id: props.id});
  };
  const gotoSet = () => {
    navigation.navigate('set', {id: props.id});
  };

  return (
    <View marginVertical="l" flexDirection="row">
      <View borderWidth={1} borderRadius={4} flex={1}>
        <Pressable p="m" flex={1} alignItems="center" onPress={gotoGet}>
          <Text>Vittja tinan</Text>
        </Pressable>
      </View>
      <View width={8} />
      <View flex={1} borderWidth={1} borderRadius={4}>
        <Pressable p="m" flex={1} alignItems="center" onPress={gotoSet}>
          <Text>Sätt tinan</Text>
        </Pressable>
      </View>
    </View>
  );
};

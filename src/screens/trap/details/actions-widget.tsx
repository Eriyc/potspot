import { useNavigation} from '@react-navigation/native';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import React from 'react';
import {Button, View} from 'ui';

type ActionsWidgetProps = {
  id: number;
  in_use: boolean;
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
      <Button onPress={gotoGet} label="Vittja tinan" padding="m" flex={1} />
      <View width={8} />
      <Button onPress={gotoSet} label="Sätt tinan" padding="m" flex={1} />
    </View>
  );
};

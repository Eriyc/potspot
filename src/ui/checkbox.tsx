import React from 'react';
import {CheckCircle, Circle} from 'react-native-feather';
import {Pressable} from './Pressable';
import {Text} from './Text';
import {View} from './View';

type CheckboxProps = {
  checked?: boolean;
  label?: string;
  value: number | string;
  onPress: (value: string | number) => void;
};
export const Checkbox = ({checked, label, onPress, value}: CheckboxProps) => {
  return (
    <View overflow="hidden" borderRadius={4} key={value}>
      <Pressable
        p="l"
        flexDirection="row"
        alignItems="center"
        android_ripple={{borderless: true}}
        onPress={() => onPress(value)}>
        {checked ? <CheckCircle color="black" /> : <Circle color="black" />}
        <Text marginLeft="s">{label}</Text>
      </Pressable>
    </View>
  );
};

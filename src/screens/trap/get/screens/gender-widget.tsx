import React, {PropsWithChildren, useState} from 'react';
import {HelpCircle} from 'react-native-feather';
import {GenderFemale, GenderMale, Pressable, View} from 'ui';

const IconButton = ({
  onPress,
  children,
  selected,
}: PropsWithChildren<{onPress: () => void; selected: boolean}>) => {
  return (
    <View
      overflow="hidden"
      borderRadius={1000}
      borderWidth={1}
      bg={selected ? 'lightblue' : 'background'}>
      <Pressable onPress={onPress} android_ripple={{borderless: true}} p="m">
        {children}
      </Pressable>
    </View>
  );
};

const SIZE = {width: 48, height: 48};

type Gender = 'male' | 'female' | undefined;
type GenderWidgetProps = {
  onGenderChange?: (gender: Gender) => void;
  gender?: Gender;
};

export const GenderWidget = (props: GenderWidgetProps) => {
  const [_, changeGender] = useState<Gender>('male');

  const setGender = (g: Gender) => {
    props.onGenderChange?.(g);
    changeGender(g);
  };

  return (
    <View flexDirection="row" justifyContent="space-evenly" alignItems="center">
      <IconButton
        onPress={() => setGender('male')}
        selected={props.gender === 'male'}>
        <GenderMale {...SIZE} />
      </IconButton>
      <IconButton
        onPress={() => setGender('female')}
        selected={props.gender === 'female'}>
        <GenderFemale {...SIZE} />
      </IconButton>
      <IconButton
        onPress={() => setGender(undefined)}
        selected={props.gender === undefined}>
        <HelpCircle color="black" {...SIZE} />
      </IconButton>
    </View>
  );
};

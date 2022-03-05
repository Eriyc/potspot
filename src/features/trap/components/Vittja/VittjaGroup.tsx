import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
} from 'react-native';
import {ChevronUp, Trash2} from 'react-native-feather';

import {Text} from '@/components/Text';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

import {useVittja} from './ListContext';
import {RowValue} from './types';
import {VittjaRow} from './VittjaRow';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface VittjaGroupProps {
  values: RowValue;
  index: number;
}

export const VittjaGroup = memo<VittjaGroupProps>(({values, index}) => {
  const [dark] = useColorScheme();
  const [open, setOpen] = useState(true);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  const {editRow} = useVittja();

  const [title, setTitle] = useState('');

  const onValueUpdated = useCallback(
    (key: keyof RowValue, value: string | number) => {
      if (key === 'species') {
        setTitle(value as string);
      }

      const updated = {...values, [key]: value};
      editRow(updated);
    },
    [values, editRow],
  );

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(spinAnimation, {
      toValue: open ? 1 : 0,
      duration: 150,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();

    setOpen(b => !b);
  };

  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={tw.style('m-2 bg-gray-100 relative', dark && 'bg-gray-700')}>
      <Pressable onPress={handleToggle} android_ripple={{borderless: false}}>
        <View
          style={tw`flex flex-row justify-between items-center my-2 ml-2 font-bold`}>
          <Text style={tw`flex-1`}>
            {title ? title : `Fångst ${index + 1}`}
          </Text>
          <Trash2 style={tw.style('text-gray-700')} height={16} width={16} />
          <Animated.View
            style={{
              transform: [
                {
                  rotate: spin,
                },
              ],
            }}>
            <ChevronUp style={tw.style(`text-gray-700`, {})} />
          </Animated.View>
        </View>
      </Pressable>
      <View style={tw`border-b border-gray-500`} />
      {open && (
        <>
          <VittjaRow
            title="Art"
            type="text"
            value={values.species}
            onChange={species => onValueUpdated('species', species)}
          />
          <VittjaRow
            title="Antal"
            type="number"
            value={values.amount}
            onChange={amount => onValueUpdated('amount', amount)}
          />
          <VittjaRow
            title="Storlek"
            type="number"
            unit="cm"
            value={values.size}
            onChange={size => onValueUpdated('size', size)}
          />
        </>
      )}
    </View>
  );
});

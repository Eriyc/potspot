import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {FadeInView, Text} from '../atoms';
import {CloseButton} from '../molecules';

export const Header = (
  props: NativeStackHeaderProps | BottomTabHeaderProps,
) => {
  const tw = useTailwind();
  const handleCloseOrGoBack = () => {
    props.navigation.goBack();
  };

  const state = props.navigation.getState();
  const showBackButton = state.index > 0;

  return (
    <View
      style={tw(
        'px-4 flex-row items-center justify-start h-14 bg-white border-b border-gray-200 dark:bg-gray-700',
      )}>
      {showBackButton && (
        <FadeInView>
          <CloseButton
            onPress={handleCloseOrGoBack}
            closeIcon={state.index === 1}
          />
        </FadeInView>
      )}
      <Text style={tw('font-bold text-lg')}>
        {props.options.title || props.route.name}
      </Text>
    </View>
  );
};

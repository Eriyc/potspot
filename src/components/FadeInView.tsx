import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useRef} from 'react';
import {Animated} from 'react-native';

import tw from '@/utils/tailwind';

const FadeInView: FC = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={tw`opacity-[ flex${fadeAnim as unknown as number}]`}>
      {props.children}
    </Animated.View>
  );
};

export {FadeInView};

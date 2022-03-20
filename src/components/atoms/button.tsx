import React, {FC, ReactNode} from 'react';
import {GestureResponderEvent, Pressable, View, ViewStyle} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from './text';

type ButtonProps = {
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
};
export const Button: FC<ButtonProps> = ({children, iconRight, iconLeft}) => {
  const tw = useTailwind();

  return (
    <Pressable style={tw('px-4 py-2 flex-row justify-center items-center')}>
      {iconLeft}
      <Text>{children}</Text>
      {iconRight}
    </Pressable>
  );
};

type IconButtonProps = {
  icon: ReactNode;
  children?: never;
  onPress?: (event: GestureResponderEvent) => void;
  style?: (pressed: boolean) => ViewStyle;
};
export const IconButton: FC<IconButtonProps> = ({icon, onPress, style}) => {
  const tw = useTailwind();

  return (
    <View style={tw('rounded-md')}>
      <Pressable
        android_ripple={{borderless: false}}
        onPress={onPress}
        style={({pressed}) => ({
          ...tw('p-2 justify-center items-center'),
          ...(style && style(pressed)),
        })}>
        {icon}
      </Pressable>
    </View>
  );
};

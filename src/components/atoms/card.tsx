import React, {FC} from 'react';
import {GestureResponderEvent, Pressable, ViewStyle} from 'react-native';
import {useTailwind} from 'tailwind-rn';

type CardProps = {
  onPress?: (ev: GestureResponderEvent) => void;
  android_ripple?: boolean;
  style?: (pressed: boolean) => ViewStyle;
};
export const Card: FC<CardProps> = ({children, onPress, style, ...props}) => {
  const tw = useTailwind();

  return (
    <Pressable
      style={({pressed}) => ({
        ...tw('p-2 rounded-md bg-white dark:bg-zinc-700'),
        ...{elevation: 4},
        ...(style && style(pressed)),
      })}
      onPress={onPress}
      android_ripple={props.android_ripple ? {foreground: false} : undefined}>
      {children}
    </Pressable>
  );
};

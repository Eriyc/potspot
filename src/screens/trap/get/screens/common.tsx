import {ResponsiveValue} from '@shopify/restyle';
import React, {PropsWithChildren} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Pressable, Text, Theme, View} from 'ui';
import {useGetState} from '../get-trap-state';

type ButtonProps = PropsWithChildren<{
  onPress?: (ev: GestureResponderEvent) => void;
  bg?: ResponsiveValue<
    | 'white'
    | 'red'
    | 'primary'
    | 'text'
    | 'background'
    | 'secondary'
    | 'muted'
    | 'lightblue'
    | 'black'
    | 'grey1'
    | 'grey2'
    | 'grey3'
    | 'grey4',
    Theme
  >;
}>;
export const Button = ({onPress, children, bg}: ButtonProps) => {
  return (
    <View
      overflow="hidden"
      borderWidth={1}
      borderRadius={4}
      flex={1}
      marginRight="s">
      <Pressable
        bg={bg}
        p="m"
        android_ripple={{borderless: true}}
        onPress={onPress}>
        <Text>{children}</Text>
      </Pressable>
    </View>
  );
};

export const Cancel = () => {
  const getState = useGetState();

  return <Button onPress={getState.reset}>Avbryt</Button>;
};

type PaginationButtonProps = {
  onPress?: () => boolean;
  label?: string
};
export const Previous = ({onPress}: PaginationButtonProps) => {
  const getState = useGetState();

  const handleBack = () => {
    onPress && onPress() && getState.previous();
  };

  return <Button onPress={handleBack}>Förgående</Button>;
};

export const Next = ({onPress, label}: PaginationButtonProps) => {
  const getState = useGetState();

  const handleNext = () => {
    onPress && onPress() && getState.next();
  };

  return <Button onPress={handleNext}>{label || 'Nästa'}</Button>;
};

type FooterProps = {
  onNext?: () => boolean;
  onBack?: () => boolean;
  nextLabel?: string;
};
export const Footer = (props: FooterProps) => {
  const state = useGetState();

  return (
    <View flexDirection="row" marginHorizontal="l">
      {state.current?.current === 0 ? (
        <Cancel />
      ) : (
        <Previous onPress={props.onBack} />
      )}
      <Next onPress={props.onNext} label={props.nextLabel} />
    </View>
  );
};

import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  composeRestyleFunctions,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

import {Text} from './Text';
import {View} from './View';
import {Theme} from './theme';
import {Pressable} from './Pressable';

const buttonVariant = createVariant({themeKey: 'buttonVariants'});

const restyleFunctions = composeRestyleFunctions([
  buttonVariant as any,
  spacing,
  border,
  backgroundColor,
]);

type Props = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
    icon?: JSX.Element;
  };

export const Button = ({
  onPress,
  label,
  loading = false,
  variant = 'primary',
  icon,
}: Props) => {
  const textVariant = 'button_' + variant;

  return (
    <View borderRadius={4} marginVertical="s">
      <Pressable
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        paddingVertical="m"
        android_ripple={{foreground: true, borderless: true}}
        onPress={onPress}>
        {loading ? <ActivityIndicator size="small" /> : {icon}}
        <Text
          variant={
            textVariant as keyof Omit<Theme['textVariants'], 'defaults'>
          }>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

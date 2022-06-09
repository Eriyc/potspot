import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  VariantProps,
  composeRestyleFunctions,
  createVariant,
  LayoutProps,
  BackgroundColorProps,
} from '@shopify/restyle';

import {Text} from './Text';
import {View} from './View';
import {theme, Theme} from './theme';
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
  SpacingProps<Theme> &
  LayoutProps<Theme> &
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
  flex,
  padding = 'm',
}: Props) => {
  const textVariant = 'defaults';

  return (
    <View
      borderRadius={4}
      marginVertical="s"
      borderWidth={1}
      bg="background"
      flex={flex}
      overflow="hidden">
      <Pressable
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        padding={padding}
        android_ripple={{borderless: true, color: theme.colors.grey3}}
        onPress={onPress}>
        {loading ? <ActivityIndicator size="small" /> : icon}
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
};

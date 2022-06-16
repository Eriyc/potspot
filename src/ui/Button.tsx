import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  SpacingProps,
  BorderProps,
  VariantProps,
  LayoutProps,
  BackgroundColorProps,
} from '@shopify/restyle';

import {Text} from './Text';
import {View} from './View';
import {theme, Theme} from './theme';
import {Pressable} from './Pressable';

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
  icon,
  flex,
  padding = 'm',
}: Props) => {
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

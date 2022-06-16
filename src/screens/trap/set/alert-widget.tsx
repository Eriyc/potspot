import {Trap} from 'api/trap';
import React from 'react';
import {Info} from 'react-native-feather';
import {Text, useTheme, View} from 'ui';

type AlertWidgetProps = {
  trap: Trap;
};
export const AlertWidget = ({trap}: AlertWidgetProps) => {
  const theme = useTheme();
  if (!trap.in_use) {
    return <View />;
  }

  return (
    <View bg="lightblue" p="m" m="m" flexDirection="row" alignItems="center">
      <Info color={theme.colors.text} />
      <Text ml="s" fontWeight="bold">
        Tinan är redan i vattnet
      </Text>
    </View>
  );
};

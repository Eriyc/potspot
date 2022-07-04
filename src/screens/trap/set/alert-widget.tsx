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

  const lastSet = new Date(trap.updated_at);
  return (
    <View bg="lightblue" p="m" m="m" flexDirection="row" alignItems="center">
      <View>
        <Info color={theme.colors.text} />
      </View>
      <View>
        <Text ml="s" fontWeight="bold">
          Tinan är redan i vattnet
        </Text>
        <Text ml="s" fontWeight="normal" textBreakStrategy="highQuality">
          Plats och/eller bete kommer ändras
        </Text>
        <Text ml="s" fontWeight="normal" textBreakStrategy="highQuality">
          Tinan sattes senast {lastSet.toLocaleDateString()}{' '}
          {lastSet.toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

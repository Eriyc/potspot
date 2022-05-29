import React from 'react';
import {Pressable, Text, useTheme, View, WIDTH} from 'ui';

type AmountWidgetProps = {
  value: number;
  onAmountChanged: (amount: number) => void;
};
export const AmountWidget = (props: AmountWidgetProps) => {
  const theme = useTheme();

  return (
    <View
      flexDirection="row"
      flexWrap="wrap"
      marginHorizontal="l"
      justifyContent="center"
      alignItems="center">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <View
            marginLeft={i % 5 !== 0 ? 's' : undefined}
            marginBottom="s"
            bg={props.value === i + 1 ? 'lightblue' : 'background'}
            key={i}
            width={(WIDTH - theme.spacing.l * 2 - theme.spacing.s * 5) / 5}
            height={(WIDTH - theme.spacing.l * 2 - theme.spacing.s * 5) / 5}
            borderWidth={2}
            borderRadius={1000}
            overflow="hidden">
            <Pressable
              justifyContent="center"
              alignItems="center"
              flex={1}
              onPress={() => {
                props.onAmountChanged(i + 1);
              }}
              android_ripple={{borderless: true}}>
              <Text>
                {i + 1}
                {i === 9 && '+'}
              </Text>
            </Pressable>
          </View>
        ))}
    </View>
  );
};

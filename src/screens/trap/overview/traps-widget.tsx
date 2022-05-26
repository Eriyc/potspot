import {TrapFeatureType, useAllTraps} from 'api/trap';
import React, {memo} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Plus} from 'react-native-feather';
import {IS_IOS, Pressable, Text, useTheme, View, WIDTH} from 'ui';

const BUTTON_WIDTH = WIDTH * 0.75;
const MARGIN = (WIDTH * 0.25) / 4 / 2;
const OFFSET = (WIDTH * 0.25) / 2 - MARGIN;

const TrapButton: ListRenderItem<TrapFeatureType> = memo(({item, index}) => {
  return (
    <View
      bg="background"
      borderRadius={8}
      width={BUTTON_WIDTH}
      style={{marginHorizontal: MARGIN}}>
      <Pressable
        paddingHorizontal="l"
        paddingVertical="m"
        flex={1}
        justifyContent="center">
        <Text>{item.properties.displayname}</Text>
      </Pressable>
    </View>
  );
});

const CreateNewTrapButton = () => {
  const theme = useTheme();

  return (
    <View
      bg="background"
      borderRadius={8}
      width={BUTTON_WIDTH}
      style={{marginHorizontal: MARGIN}}>
      <Pressable
        paddingHorizontal="l"
        alignItems="center"
        paddingVertical="m"
        flexDirection="row">
        <Plus color={theme.colors.primary} />
        <Text marginLeft="s">Ny tina</Text>
      </Pressable>
    </View>
  );
};

export const TrapsWidget = () => {
  const {data} = useAllTraps();

  if (!data) return <View></View>;

  return (
    <View position="absolute" bottom={0} left={0} right={0}>
      <FlatList
        contentInset={{left: OFFSET, right: OFFSET}}
        snapToAlignment="center"
        snapToOffsets={data.features.map(
          (_, i) => i * (BUTTON_WIDTH + MARGIN * 2),
        )}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: !IS_IOS ? OFFSET : undefined,
          paddingBottom: 8,
        }}
        horizontal
        renderItem={props => <TrapButton {...props} />}
        data={data.features}
        ListFooterComponent={() => <CreateNewTrapButton />}
      />
    </View>
  );
};

import {useNavigation} from '@react-navigation/native';
import {TrapFeatureCollection, TrapFeatureType} from 'api/trap';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import React, {memo, useCallback, useRef} from 'react';
import {FlatList, ListRenderItem, ViewToken} from 'react-native';

import {Plus} from 'react-native-feather';

import {ErrorHandler, IS_IOS, Pressable, Text, useTheme, View, WIDTH} from 'ui';
import {useMapState} from './map-state';

const BUTTON_WIDTH = WIDTH * 0.75;
const MARGIN = (WIDTH * 0.25) / 4 / 2;
const OFFSET = (WIDTH * 0.25) / 2 - MARGIN;

const TrapButton: ListRenderItem<TrapFeatureType> = memo(({item}) => {
  const navigation = useNavigation<TrapNavigationProp<'overview'>>();

  return (
    <View
      bg="background"
      borderRadius={8}
      width={BUTTON_WIDTH}
      style={{marginHorizontal: MARGIN}}>
      <Pressable
        onPress={() =>
          navigation.navigate('details', {
            id: parseInt(item.id!.toString(), 10),
          })
        }
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
  const navigation = useNavigation<TrapNavigationProp<'overview'>>();

  return (
    <View
      bg="background"
      overflow="hidden"
      borderRadius={8}
      width={BUTTON_WIDTH}
      style={{marginHorizontal: MARGIN}}>
      <Pressable
        onPress={() => navigation.navigate('create')}
        android_ripple={{borderless: true}}>
        <View
          flexDirection="row"
          paddingHorizontal="l"
          alignItems="center"
          paddingVertical="m">
          <Plus color={theme.colors.primary} />
          <Text marginLeft="s">Ny tina</Text>
        </View>
      </Pressable>
    </View>
  );
};

type ViewableItemsProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

type TrapsWidgetProps = {
  traps?: TrapFeatureCollection;
};
export const TrapsWidget = ({traps}: TrapsWidgetProps) => {
  const mapState = useMapState();
  const list = useRef<FlatList<TrapFeatureType>>(null);

  const handleViewableItems = useCallback(
    ({viewableItems}: ViewableItemsProps) => {
      if (viewableItems.length === 0) {
        return;
      }

      mapState.setSelectedTrap(viewableItems[0].item.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  console.log(traps);

  if (!traps || !traps.features) {
    return <View />;
  }

  return (
    <View position="absolute" bottom={0} left={0} right={0}>
      <ErrorHandler>
        <FlatList
          ref={list}
          contentInset={{left: OFFSET, right: OFFSET}}
          snapToAlignment="center"
          snapToOffsets={traps.features.map(
            (_, i) => i * (BUTTON_WIDTH + MARGIN * 2),
          )}
          decelerationRate="fast"
          contentContainerStyle={style}
          onViewableItemsChanged={handleViewableItems}
          viewabilityConfig={{itemVisiblePercentThreshold: 50}}
          horizontal
          renderItem={props => <TrapButton {...props} />}
          data={traps.features}
          onScrollToIndexFailed={() => null}
          ListFooterComponent={CreateNewTrapButton}
        />
      </ErrorHandler>
    </View>
  );
};

const style = {
  paddingHorizontal: !IS_IOS ? OFFSET : undefined,
  paddingBottom: 8,
};

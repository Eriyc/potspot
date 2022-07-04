import {useNavigation, useRoute} from '@react-navigation/native';
import {useAllBait} from 'api/bait';
import {TrapNavigationProp, TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Pressable, Text, theme, View, WIDTH} from 'ui';

export const PickBaitModal = () => {
  const route = useRoute<TrapRoute<'pick-bait-modal'>>();
  const navigation = useNavigation<TrapNavigationProp<'pick-bait-modal'>>();
  const {data} = useAllBait();

  const returnValue = (bait: number) => {
    navigation.navigate({
      name: route.params.returnTo,
      params: {bait},
      merge: true,
    } as any);
  };

  return (
    <View>
      <View paddingHorizontal="m" paddingVertical="xl">
        <Text variant="header">Välj ett bete</Text>
        <Text variant="body">
          Nuvarande bete:{' '}
          {data?.find(b => b.id === route.params.bait)?.name || 'Okänt'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={scrollStyle}>
        {data?.map((b, i) => (
          <View
            key={b.id}
            flexBasis={(WIDTH - theme.spacing.m * 2 - theme.spacing.s) / 2}
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            borderWidth={1}
            mr={i % 2 === 0 ? 's' : undefined}
            mb="s"
            flexDirection="row"
            borderRadius={4}>
            <Pressable
              onPress={() => returnValue(b.id)}
              flex={1}
              justifyContent="center"
              alignItems="center"
              p="xl"
              android_ripple={{borderless: true, radius: WIDTH / 3}}>
              <Text>{b.name}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const scrollStyle: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  flexGrow: 1,
  paddingHorizontal: theme.spacing.m,
};

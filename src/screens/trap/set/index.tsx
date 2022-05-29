import {useNavigation, useRoute} from '@react-navigation/native';
import {Trap, useSetTrap, useSingleTrap} from 'api/trap';
import {TrapNavigationProp, TrapRoute} from 'navigation/trap-navigator';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {INITIAL_POS, Pressable, Text, useTheme, View} from 'ui';
import {AlertWidget} from './alert-widget';
import {MapPositionWidget} from './map-position-widget';
import {PickBaitWidget} from './pick-bait-widget';

export const SetTrapScreen = () => {
  const navigation = useNavigation<TrapNavigationProp<'set'>>();
  const route = useRoute<TrapRoute<'set'>>();
  const id = route.params.id;

  const mutation = useSetTrap();
  const theme = useTheme();

  useEffect(() => {
    if (route.params.bait) {
      setBait(route.params.bait);
    }
  }, [route.params.bait]);

  const {data} = useSingleTrap(id);
  const [baitId, setBait] = useState<number | undefined>();
  const [pos, setPos] = useState(data!.pos);

  if (!data) return <View />;

  const trap = data as Trap;

  const save = () => {
    mutation.mutate(
      {
        bait: baitId || data.bait!,
        id,
        pos: pos || INITIAL_POS,
      },
      {
        onSuccess: () => navigation.navigate('details', {id}),
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <AlertWidget trap={trap} />
      <MapPositionWidget
        initialCoordinates={trap.in_use ? trap.pos : undefined}
        onPositionChanged={setPos}
      />
      <PickBaitWidget bait={baitId || trap.bait} />

      <View
        borderWidth={1}
        borderRadius={4}
        overflow="hidden"
        marginVertical="m"
        marginHorizontal="l">
        <Pressable
          disabled={mutation.isLoading}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          onPress={save}
          android_ripple={{borderless: true, color: theme.colors.grey3}}
          p="m">
          {mutation.isLoading && <ActivityIndicator />}
          <Text ml="s">Sätt tinan</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

import React, {useState} from 'react';
import {Pressable, Text, View} from 'ui';
import {Checkbox} from 'ui/checkbox';
import {GetAvalibleCatchesIds, useGetState} from '../get-trap-state';

const AVALIBLE_CATCH: {id: GetAvalibleCatchesIds; label: string}[] = [
  {
    label: 'Hummer',
    id: 'lobster',
  },
  {
    label: 'Krabba',
    id: 'crab',
  },
  {
    label: 'Annat',
    id: 'other',
  },
];

// första skärmen
export const PickCatchScreen = () => {
  const getState = useGetState();
  const [selected, setSelected] = useState<GetAvalibleCatchesIds | null>(null);

  const start = () => {
    if (!selected) {
      return;
    }
    getState.start(selected);
  };

  return (
    <View>
      <View flexGrow={1}>
        <View marginHorizontal="l">
          <Text variant="header">Välj din fångst</Text>
          <Text>Fick du mer än en art? Registrera en art i taget.</Text>
        </View>
        {AVALIBLE_CATCH.map(item => (
          <Checkbox
            onPress={() => setSelected(item.id)}
            value={item.id}
            checked={selected === item.id}
            key={item.id}
            label={item.label}
          />
        ))}
        <View>
          <View borderWidth={1} borderRadius={4} m="l" overflow="hidden">
            <Pressable
              onPress={start}
              p="m"
              android_ripple={{borderless: true}}
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Text>Nästa</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import {supabase} from '@/utils/supabase';
import tw from '@/utils/tailwind';

import {BaitCard} from './bait-card';
import {GridList} from './grid-list';
import {Bait} from '../types';

const BaitPickerHeader: FC = () => (
  <View style={tw`flex flex-col justify-center items-center py-4`}>
    <Text style={tw`text-xl font-bold`}>Byt bete</Text>
    <Text style={tw``}>Klicka på en ruta för att välja betet</Text>
  </View>
);

type BaitPickerProps = {
  onSuccess: (newBait: Bait) => void;
};

const BaitPicker: FC<BaitPickerProps> = ({onSuccess}) => {
  const [bait, setBait] = useState<Bait[]>([]);
  const {
    trapStore: {selected},
  } = useMst();

  const fetchBait = useCallback(async () => {
    const {body} = await supabase.from('bait').select('*');
    setBait(body || []);
  }, []);

  useEffect(() => {
    fetchBait();
  }, [fetchBait]);

  const updateBait = useCallback(
    async (item: Bait) => {
      if (!selected?.id) return;
      const {error, body} = await supabase
        .from('traps')
        .update({bait: item.id}, {returning: 'representation'})
        .eq('id', selected.id);
      console.log(error, body, selected.id);
    },
    [selected?.id],
  );

  return (
    <GridList
      ListHeaderComponent={BaitPickerHeader}
      data={bait}
      renderItem={({item}) => (
        <BaitCard
          key={item.id}
          selected={selected?.bait === item.id}
          bait={item}
          onPress={() => updateBait(item).then(() => onSuccess(item))}
        />
      )}
    />
  );
};

export {BaitPicker};

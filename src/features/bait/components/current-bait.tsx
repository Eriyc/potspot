import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {Button, View} from 'react-native';

import {Text} from '@/components/Text';

import {supabase} from '@/utils/supabase';
import tw from '@/utils/tailwind';

import {Bait} from '../types';

type CurrentBaitProps = {
  id: number;
};

const CurrentBait: FC<CurrentBaitProps> = memo(({id}) => {
  const [bait, setBait] = useState<Bait | null>(null);

  const fetchBait = useCallback(async () => {
    const {body} = await supabase
      .from('bait')
      .select('*')
      .eq('id', id)
      .single();
    setBait(body);
  }, [id]);

  useEffect(() => {
    fetchBait();
  }, [fetchBait]);

  const openBaitPicker = () => {};

  if (!bait) {
    return (
      <View>
        <View style={tw.style('bg-red-500')} />
      </View>
    );
  }

  return (
    <View
      style={tw.style('p-2 my-2 flex flex-row rounded-sm items-center border')}>
      <Text style={tw`flex-1`}>Bete: {bait.name}</Text>
      <Button title="Ändra" onPress={openBaitPicker} />
    </View>
  );
});

export {CurrentBait};

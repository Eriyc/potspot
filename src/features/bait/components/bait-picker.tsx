import React, {FC} from 'react';
import {View} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

import {BaitCard} from './bait-card';
import {GridList} from './grid-list';
import {useBaits} from '../hooks/useBaits';
import {Bait} from '../types';

const BaitPickerHeader: FC = () => (
  <View style={tw`flex flex-col justify-center items-center py-4`}>
    <Text style={tw`text-xl font-bold`}>Byt bete</Text>
    <Text style={tw``}>Klicka på en ruta för att välja betet</Text>
  </View>
);

type BaitPickerProps = {
  handleBaitUpdate: (newBait: Bait) => void;
  currentBait: number;
};

const BaitPicker: FC<BaitPickerProps> = ({handleBaitUpdate, currentBait}) => {
  const {data: bait} = useBaits();

  if (!bait) return <View />;

  return (
    <GridList
      ListHeaderComponent={BaitPickerHeader}
      data={bait}
      renderItem={({item}) => (
        <BaitCard
          key={item.id}
          selected={currentBait === item.id}
          bait={item}
          onPress={() => handleBaitUpdate(item)}
        />
      )}
    />
  );
};

export {BaitPicker};
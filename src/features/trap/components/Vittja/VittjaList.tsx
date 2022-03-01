import React from 'react';
import {FlatList, Pressable, View} from 'react-native';

import {Text} from '@/components/Text';

import tw from '@/utils/tailwind';

import {RowValue} from './types';
import {VittjaGroup} from './VittjaGroup';

interface VittjaListProps {
  rows: RowValue[];
  editRow: (index: number) => (value: RowValue) => void;
  addRow: () => void;
}

export const VittjaList = ({rows, editRow, addRow}: VittjaListProps) => {
  return (
    <FlatList
      data={rows}
      contentContainerStyle={tw`pb-20`}
      ListFooterComponent={
        <View style={tw`flex flex-row justify-center`}>
          <Pressable
            onPress={addRow}
            style={tw.style('px-4 py-2 bg-primary-light rounded-sm mb-4 mt-2')}>
            <Text invert>Lägg till fångst</Text>
          </Pressable>
        </View>
      }
      renderItem={({item, index}) => (
        <VittjaGroup
          index={index}
          values={item}
          updateValue={editRow(index)}
          key={index}
        />
      )}
    />
  );
};

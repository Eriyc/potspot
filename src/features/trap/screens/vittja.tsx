import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {CheckCircle} from 'react-native-feather';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import tw from '@/utils/tailwind';

import {RowValue, VittjaList} from '../components/Vittja';

const emptyRow: RowValue = {species: '', amount: 0, size: 0, size_unit: 'cm'};

const VittjaTrapScreen = observer(() => {
  const {
    trapStore: {selected},
  } = useMst();

  if (!selected) {
    return <View />;
  }

  const [rows, setRows] = useState<RowValue[]>([emptyRow]);

  const editRow = (index: number) => (newRow: RowValue) => {
    setRows(currentRows => {
      const all = currentRows;
      all[index] = newRow;
      return all;
    });
  };

  const addRow = () => {
    setRows(current => [...current, emptyRow]);
  };

  return (
    <View style={tw.style('flex')}>
      <View style={tw.style('p-4 flex flex-row items-center justify-between')}>
        <Text style={tw`text-lg font-bold`}>
          Vittja fångst för tinan "{selected.displayname}"
        </Text>
        <Pressable
          style={tw.style('')}
          android_ripple={{borderless: false, radius: 24}}>
          <CheckCircle style={tw.style('text-gray-700 m-4')} />
        </Pressable>
      </View>
      <VittjaList editRow={editRow} addRow={addRow} rows={rows} />
    </View>
  );
});

export {VittjaTrapScreen};

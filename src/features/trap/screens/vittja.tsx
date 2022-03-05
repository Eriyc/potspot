import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {CheckCircle} from 'react-native-feather';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import {supabase} from '@/utils/supabase';
import tw from '@/utils/tailwind';

import {RowValue, Vittja} from '../components/Vittja';
import {convertPositionToDb} from '../lib/convertPosition';
import {TrapRoute} from '../navigator';

const createRow = (): RowValue => {
  return {
    species: '',
    amount: 0,
    size: 0,
    size_unit: 'cm',
    id: nanoid(4),
  };
};

const VittjaTrapScreen = observer(() => {
  const {
    trapStore: {selected},
    authStore: {currentUser},
  } = useMst();

  const navigation = useNavigation<TrapRoute>();

  if (!selected) {
    return <View />;
  }

  const [rows, setRows] = useState<RowValue[]>([createRow()]);

  const editRow = (newRow: RowValue) => {
    setRows(currentRows =>
      currentRows.map(row => {
        if (row.id === newRow.id) {
          return newRow;
        } else {
          return row;
        }
      }),
    );
  };

  const addRow = () => {
    setRows(current => [...current, createRow()]);
  };

  const removeRow = (itemId: RowValue['id']) => {
    setRows(currentRows => currentRows.filter(row => row.id !== itemId));
  };

  const complete = async () => {
    const validRows = rows.filter(row => row.species !== '');
    console.log(validRows);

    if (validRows.length === 0) {
      Alert.alert('Ingen fångst', 'Stöds inte ännu, vänligen lägg till fångst');
      return;
    }

    const {error} = await supabase.from('catch').insert({
      trap_id: selected.id,
      created_by: currentUser?.id,
      data: rows,
      position: convertPositionToDb(selected.pos.toJSON() as [number, number]),
    });

    if (error) {
      console.log(error);
    } else {
      navigation.navigate('view');
    }
  };

  return (
    <View style={tw.style('flex')}>
      <View style={tw.style('p-4 flex flex-row items-center justify-between')}>
        <Text style={tw`text-lg font-bold`}>
          Vittja fångst för tinan "{selected.displayname}"
        </Text>
        <Pressable
          style={tw.style('')}
          android_ripple={{borderless: false, radius: 24}}
          onPress={complete}>
          <CheckCircle style={tw.style('text-gray-700 m-4')} />
        </Pressable>
      </View>
      <Vittja
        editRow={editRow}
        addRow={addRow}
        removeRow={removeRow}
        rows={rows}
      />
    </View>
  );
});

export {VittjaTrapScreen};

import {useNavigation, useRoute} from '@react-navigation/native';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {CheckCircle} from 'react-native-feather';

import {Text} from '@/components/Text';

import {useUser} from '@/features/account';
import tw from '@/utils/tailwind';

import {RowValue, Vittja} from '../components/Vittja';
import {useTrap} from '../hooks/useTrap';
import {useVittja} from '../hooks/useVittjaTrap';
import {TrapNavigation, VittjaTrapRoute} from '../navigator';

const createRow = (): RowValue => {
  return {
    species: '',
    amount: 0,
    size: 0,
    size_unit: 'cm',
    id: nanoid(4),
  };
};

const VittjaTrapScreen = () => {
  const {data: user} = useUser();
  const {params} = useRoute<VittjaTrapRoute>();
  const {data} = useTrap(params.id);
  const navigation = useNavigation<TrapNavigation>();
  const [rows, setRows] = useState<RowValue[]>([createRow()]);

  const vittjaMutation = useVittja();

  if (!data) {
    return <View />;
  }

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

    if (!user) {
      throw new Error('Not logged in?');
    }

    vittjaMutation.mutate({
      trap_id: data.id,
      bait_id: data.bait,
      created_by: user.id,
      data: rows,
      position: data.pos,
    });

    navigation.navigate('view', {id: data.id});
  };

  return (
    <View style={tw.style('flex')}>
      <View style={tw.style('p-4 flex flex-row items-center justify-between')}>
        <Text style={tw`text-lg font-bold`}>
          Vittja fångst för tinan "{data.displayname}"
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
};

export {VittjaTrapScreen};

import {observer} from 'mobx-react-lite';
import React, {FC, ReactElement, useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

interface CatchGroupProps {
  values: RowValue;
  index: number;
  updateValue: (values: RowValue) => void;
}

const CatchGroup: FC<CatchGroupProps> = ({values, updateValue}) => {
  const [dark] = useColorScheme();

  const onValueUpdated = (key: keyof RowValue, value: string | number) => {
    const updated = values;
    (updated[key] as string | number) = value;
    updateValue(updated);
  };

  return (
    <View style={tw.style('m-2 bg-gray-100 ', dark && 'bg-gray-700')}>
      <Text style={tw`my-2 ml-2 font-bold`}>Fångst {}</Text>
      <View style={tw`border-b border-gray-500`} />
      <CatchRow
        title="Art"
        type="text"
        value={values.species}
        onChange={species => onValueUpdated('species', species)}
      />
      <CatchRow
        title="Antal"
        type="number"
        value={values.amount}
        onChange={amount => onValueUpdated('amount', amount)}
      />
      <CatchRow
        title="Storlek"
        type="number"
        unit="cm"
        value={values.size}
        onChange={size => onValueUpdated('size', size)}
      />
    </View>
  );
};

interface BaseCatchRowProps {
  title: string;
  type: 'number' | 'choices' | 'text';
  unit?: 'cm' | 'kg';
  value: string | number;
  onChange: (value: any) => any;
}

interface NumberCatchRowProps extends BaseCatchRowProps {
  type: 'number';
  value: number;
  onChange: (value: number) => any;
}
interface TextCatchRowProps extends BaseCatchRowProps {
  type: 'text';
  value: string;
  onChange: (value: string) => any;
}

type CatchRowProps = NumberCatchRowProps | TextCatchRowProps;

const CatchRow = ({title, type, onChange, value, unit}: CatchRowProps) => {
  let form: ReactElement;

  if (type === 'number') {
    const callback = (num: number) => (onChange as (value: number) => any)(num);
    form = (
      <View style={tw.style('flex flex-row items-center w-40')}>
        <TextInput
          placeholder="Skriv här"
          value={`${value}`}
          keyboardType="numeric"
          style={tw.style('flex-1')}
          onChangeText={text =>
            callback(parseFloat(text.replace(/[^A-Za-z]/g, '')))
          }
        />
        {unit && <Text>{unit}</Text>}
      </View>
    );
  } else {
    const callback = (text: string) =>
      (onChange as (value: string) => any)(text);
    form = (
      <TextInput
        placeholder="Skriv här"
        value={`${value}`}
        style={tw.style('w-40')}
        onChangeText={text => callback(text)}
      />
    );
  }

  return (
    <View
      style={tw.style(
        'px-2 flex flex-row items-center border-b border-gray-500',
      )}>
      <Text style={tw`flex-1`}>{title}</Text>
      {form}
    </View>
  );
};

type RowValue = {
  species: string;
  amount: number;
  size: number;
  size_unit: 'cm' | 'kg';
};

const VittjaTrapScreen = observer(() => {
  const {
    trapStore: {selected},
  } = useMst();

  if (!selected) {
    return <View />;
  }

  const [rows, setRows] = useState<RowValue[]>([
    {species: '', amount: 0, size: 0, size_unit: 'cm'},
  ]);

  const editRow = (index: number) => (newRow: RowValue) => {
    setRows(currentRows => {
      const all = currentRows;
      all[index] = newRow;
      return all;
    });
  };

  return (
    <View>
      <View style={tw.style('p-4')}>
        <Text style={tw`text-lg font-bold`}>
          Vittja fångst för tinan "{selected.displayname}"
        </Text>
      </View>
      {rows.map((row, i) => (
        <CatchGroup
          updateValue={editRow(i)}
          key={`${i}`}
          values={row}
          index={i}
        />
      ))}
      <View style={tw.style('flex justify-center items-center')}>
        <Pressable
          style={tw.style('px-4 py-2 bg-primary-light rounded-sm mb-4 mt-2')}>
          <Text invert>Lägg till fångst</Text>
        </Pressable>
        <Pressable style={tw.style('px-4 py-2 bg-green-600 rounded-sm')}>
          <Text>Slutför</Text>
        </Pressable>
      </View>
    </View>
  );
});

export {VittjaTrapScreen};

import React, {ReactElement} from 'react';
import {TextInput, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components/Text';

interface BaseVittjaRowProps {
  title: string;
  type: 'number' | 'choices' | 'text';
  unit?: 'cm' | 'kg';
  value?: string | number;
  onChange: (value: any) => any;
}

interface NumberVittjaRowProps extends BaseVittjaRowProps {
  type: 'number';
  value?: number;
  onChange: (value: number) => any;
}
interface TextVittjaRowProps extends BaseVittjaRowProps {
  type: 'text';
  value?: string;
  onChange: (value: string) => any;
}

type VittjaRowProps = NumberVittjaRowProps | TextVittjaRowProps;

export const VittjaRow = ({
  title,
  type,
  onChange,
  value,
  unit,
}: VittjaRowProps) => {
  const tw = useTailwind();
  let form: ReactElement;

  if (type === 'number') {
    const callback = (num: number) => onChange(num);
    form = (
      <View style={tw('flex flex-row items-center w-40')}>
        <TextInput
          placeholder="Skriv här"
          value={value ? value.toString() : ''}
          keyboardType="numeric"
          style={tw('flex-1')}
          onChangeText={text => callback(parseInt(text, 10))}
        />
        {unit && <Text>{unit}</Text>}
      </View>
    );
  } else {
    const callback = (text: string) => onChange(text);
    form = (
      <TextInput
        placeholder="Skriv här"
        value={value}
        style={tw('w-40')}
        onChangeText={text => callback(text)}
      />
    );
  }

  return (
    <View
      style={tw('px-2 flex flex-row items-center border-b border-gray-500')}>
      <Text style={tw(`flex-1`)}>{title}</Text>
      {form}
    </View>
  );
};

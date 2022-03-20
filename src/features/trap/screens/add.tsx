import {useNavigation} from '@react-navigation/native';
import {Point} from 'geojson';
import React, {FC, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTailwind} from 'tailwind-rn/dist';

import {CloseButton} from '@/components';

import {INITIAL_POS} from '@/features/trap';

import {PickLocationMap} from '../components';
import {useCreateTrap} from '../hooks/useCreateTrap';
import {TrapNavigation} from '../navigator';

export const AddTrapScreen: FC = () => {
  const createTrapMutation = useCreateTrap();
  const navigation = useNavigation<TrapNavigation>();
  const tw = useTailwind();

  const [status, setStatus] = useState<
    'initial' | 'working' | 'success' | 'error'
  >('initial');

  const [name, setName] = useState('');
  const [location, setLocation] = useState(INITIAL_POS);

  const handleLocation = (pos: [number, number]) => {
    setLocation(pos);
  };

  const createTrap = async () => {
    setStatus('working');

    const pos: Point = {
      coordinates: location,
      type: 'Point',
    };

    createTrapMutation.mutate(
      {
        displayname: name.trim() || 'Tina utan namn',
        pos,
      },
      {
        onSuccess: () => {
          navigation.canGoBack() && navigation.goBack();
        },
      },
    );
  };
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={60}
      contentContainerStyle={tw('p-4 pb-16')}>
      <CloseButton />
      <Text style={tw('text-2xl text-black font-bold dark:text-white')}>
        Skapa ny tina
      </Text>

      <PickLocationMap onLocationChange={handleLocation} />

      <View>
        <Text style={tw('text-gray-500 text-lg dark:text-gray-100')}>
          Namnge tinan
        </Text>
        <TextInput
          onChangeText={setName}
          style={tw(
            'rounded-sm text-black dark:bg-gray-700 dark:text-white border border-gray-500',
          )}
        />
      </View>

      <Pressable
        disabled={status === 'working' || status === 'success'}
        onPress={createTrap}
        style={tw(
          'bg-primary-light rounded-sm mt-4 p-2 flex flex-row items-center justify-center dark:bg-primary-dark',
          /* status === 'success' && 'bg-green-500',
          status === 'error' && 'bg-red-500', */
        )}>
        {status === 'working' && <ActivityIndicator color={'red'} />}
        <Text style={tw('text-white text-lg px-2 dark:text-white')}>Skapa</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

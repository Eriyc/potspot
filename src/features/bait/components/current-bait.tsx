import {observer} from 'mobx-react-lite';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import {Text} from '@/components/Text';

import {useMst} from '@/store';
import {supabase} from '@/utils/supabase';
import tw from '@/utils/tailwind';

import {BaitPicker} from './bait-picker';
import {Bait} from '../types';

type CurrentBaitProps = {
  id: number;
};

const CurrentBait: FC<CurrentBaitProps> = observer(({id}) => {
  const {
    trapStore: {loadTrap, selected},
  } = useMst();
  const [bait, setBait] = useState<Bait | null>(null);
  const [showBaitPicker, setShowBaitPicker] = useState(false);

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

  const openBaitPicker = useCallback(() => setShowBaitPicker(true), []);
  const closeBaitPicker = useCallback(() => setShowBaitPicker(false), []);

  const onSuccess = (newBait: Bait) => {
    setBait(newBait);
    closeBaitPicker();
    if (selected) loadTrap(selected.id);
  };

  if (!bait) {
    return (
      <View>
        <View style={tw.style('bg-red-500')} />
      </View>
    );
  }

  return (
    <>
      <View
        style={tw.style(
          'p-2 my-2 flex flex-row rounded-sm items-center border',
        )}>
        <Text style={tw`flex-1`}>Bete: {bait.name}</Text>
        <Button title="Ändra" onPress={openBaitPicker} />
      </View>
      <ReactNativeModal
        renderToHardwareTextureAndroid
        style={tw.style('bg-white rounded-sm')}
        isVisible={showBaitPicker}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onDismiss={closeBaitPicker}
        onBackButtonPress={closeBaitPicker}
        onBackdropPress={closeBaitPicker}>
        <BaitPicker onSuccess={onSuccess} />
      </ReactNativeModal>
    </>
  );
});

export {CurrentBait};

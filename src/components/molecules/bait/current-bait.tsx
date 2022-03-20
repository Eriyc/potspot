import React, {FC, useCallback, useState} from 'react';
import {Button, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useTailwind} from 'tailwind-rn';

import {useBait} from '@/hooks/bait';

import {Text} from '@/components/atoms/text';

import {BaitPicker} from './bait-picker';

import {Bait} from '@/types/bait';

type CurrentBaitProps = {
  id: number;
  onBaitChange: (bait: Bait) => void;
};

const CurrentBait: FC<CurrentBaitProps> = ({id, onBaitChange}) => {
  const tw = useTailwind();
  const {data: bait, isLoading} = useBait(id);

  const [showBaitPicker, setShowBaitPicker] = useState(false);

  const openBaitPicker = useCallback(() => setShowBaitPicker(true), []);
  const closeBaitPicker = useCallback(() => setShowBaitPicker(false), []);

  const handleBaitChange = (newBait: Bait) => {
    onBaitChange(newBait);
    closeBaitPicker();
  };

  if (isLoading) {
    return (
      <View>
        <View style={tw('bg-red-500')} />
      </View>
    );
  }

  if (!bait) {
    console.log('Loaded but no bait');
    return <View />;
  }

  return (
    <>
      <View style={tw('p-2 my-2 flex flex-row rounded-sm items-center border')}>
        <Text style={tw(`flex-1`)}>Bete: {bait.name}</Text>
        <Button title="Ändra" onPress={openBaitPicker} />
      </View>
      {showBaitPicker && (
        <ReactNativeModal
          renderToHardwareTextureAndroid
          style={tw('bg-white rounded-sm')}
          isVisible={showBaitPicker}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onDismiss={closeBaitPicker}
          onBackButtonPress={closeBaitPicker}
          onBackdropPress={closeBaitPicker}>
          <BaitPicker
            handleBaitUpdate={handleBaitChange}
            currentBait={bait.id}
          />
        </ReactNativeModal>
      )}
    </>
  );
};

export {CurrentBait};

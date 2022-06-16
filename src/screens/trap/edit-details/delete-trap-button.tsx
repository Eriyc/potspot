import {useDeleteTrap} from 'api/trap';
import React from 'react';
import {Alert} from 'react-native';
import {Button, theme, View} from 'ui';

type DeleteTrapButtonProps = {
  id: number;
};
export const DeleteTrapButton = ({id}: DeleteTrapButtonProps) => {
  const mutation = useDeleteTrap({id});

  const deleteTrap = () => {
    Alert.alert(
      'Radera tina',
      'Är du säker? Raderade tinor kan inte återhämtas. Loggad fångst kommer vara kvar, men platshistorik kommer också att raderas.',
      [
        {text: 'Avbryt', style: 'cancel'},
        {
          text: 'Radera',
          style: 'destructive',
          onPress: () => mutation.mutate(),
        },
      ],
    );
  };

  return (
    <View>
      <Button
        borderColor="red"
        backgroundColor={'red'}
        label="Radera tinan"
        onPress={deleteTrap}
        ripple={theme.colors.grey1}
      />
    </View>
  );
};

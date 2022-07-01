import {useNavigation} from '@react-navigation/native';
import {useSingleTrap} from 'api/trap';
import {useAuth} from 'core';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import React from 'react';
import {Edit} from 'react-native-feather';
import {Pressable, useTheme, View} from 'ui';

type EditTrapButtonProps = {
  id: number;
};

export const renderEditButton = (id: number) => <EditTrapButton id={id} />;

export const EditTrapButton = ({id}: EditTrapButtonProps) => {
  const {uid} = useAuth();
  const {data} = useSingleTrap(id);
  const theme = useTheme();
  const navigation = useNavigation<TrapNavigationProp<'details'>>();

  const gotoEdit = () => {
    navigation.navigate('edit', {id: id});
  };

  return (
    <View mr="m" overflow="hidden" bg="white" borderRadius={32}>
      <Pressable
        p="s"
        android_ripple={{borderless: true, color: theme.colors.grey3}}
        onPress={gotoEdit}>
        <Edit color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};

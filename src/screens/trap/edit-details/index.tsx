import {useRoute} from '@react-navigation/native';
import {useSingleTrap} from 'api/trap';
import {TrapRoute} from 'navigation/trap-navigator';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Input, View} from 'ui';
import {DeleteTrapButton} from './delete-trap-button';

type EditTrapForm = {
  displayname: string;
};

export const EditTrapDetailsScreen = () => {
  const {
    params: {id},
  } = useRoute<TrapRoute<'edit'>>();
  const {control} = useForm<EditTrapForm>();
  const {data} = useSingleTrap(id);
  return (
    <View p="l" flex={1}>
      <View flex={1}>
        <Input
          control={control}
          name="displayname"
          label="Tinans namn"
          defaultValue={data?.displayname}
        />
      </View>
      <DeleteTrapButton id={id} />
    </View>
  );
};

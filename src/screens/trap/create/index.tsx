import {useCreateTrap} from 'api/trap';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {INITIAL_POS, Input, Pressable, Text, theme, View} from 'ui';
import {MapPositionWidget} from '../set/map-position-widget';

type FormData = {
  name: string;
};
export const CreateNewTrapScreen = () => {
  const mutation = useCreateTrap();
  const {control, handleSubmit} = useForm<FormData>();
  const [pos, setPos] = useState(INITIAL_POS);

  const create = (props: FormData) => {
    mutation.mutate({
      displayname: props.name,
      pos: {coordinates: pos, type: 'Point'},
    });
  };

  return (
    <ScrollView contentContainerStyle={grow}>
      <MapPositionWidget onPositionChanged={setPos} />
      <View flex={1} paddingHorizontal="l">
        <Text variant="header">Ange namn på tinan</Text>
        <Input
          control={control}
          name="name"
          label="Tinans namn"
          placeholder="Tina ..."
        />
      </View>
      <View
        marginHorizontal="l"
        overflow="hidden"
        borderWidth={1}
        borderRadius={4}>
        <Pressable
          flex={1}
          p="l"
          justifyContent="center"
          android_ripple={{borderless: true}}
          onPress={handleSubmit(create)}>
          <Text>Skapa tina</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const grow = {flexGrow: 1, paddingBottom: theme.spacing.l};

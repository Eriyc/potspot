import {useNavigation} from '@react-navigation/native';
import {useAllTraps} from 'api/trap';
import {TrapNavigationProp} from 'navigation/trap-navigator';
import React from 'react';
import {ChevronRight} from 'react-native-feather';
import {Pressable, Text, theme, View} from 'ui';

const TrapListScreen = () => {
  const navigation = useNavigation<TrapNavigationProp<'overview'>>();
  const {data} = useAllTraps();

  return (
    <View flex={1} m="l">
      {data?.features.map(f => (
        <View key={f.id} mb="m" borderRadius={4} bg="white" overflow="hidden">
          <Pressable
            onPress={() => {
              navigation.goBack();
              navigation.navigate('details', {id: f.id as number});
            }}
            android_ripple={{borderless: true, color: theme.colors.grey3}}
            p="m"
            flexDirection="row"
            justifyContent="space-between">
            <View>
              <Text>{f.properties.displayname}</Text>
            </View>
            <ChevronRight height={24} width={24} color="black" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export {TrapListScreen};

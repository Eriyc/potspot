import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions} from 'react-native';

import {Trap} from '@/hooks/traps';

import {Text} from '@/components';
import {Card} from '@/components/atoms';

import {TrapNavigation} from '@/navigation/trap-navigation';

interface TrapMapCardProps {
  item: Trap;
}

export const TrapMapCard: FC<TrapMapCardProps> = ({item}) => {
  const navigation = useNavigation<TrapNavigation>();

  const onPress = () => {
    navigation.navigate('view', {id: item.id});
  };

  return (
    <Card
      onPress={onPress}
      android_ripple
      style={() => ({
        ...{
          marginRight: Dimensions.get('screen').width * 0.05,
          width: Dimensions.get('screen').width * 0.8,
        },
      })}>
      <Text>{item.displayname}</Text>
    </Card>
  );
};

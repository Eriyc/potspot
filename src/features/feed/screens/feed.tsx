import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {Text} from '@/components/Text';

import {useProfile} from '@/features/account/hooks/useProfile';

import {usePosts} from '../hooks/usePosts';
import {Catch} from '../types';

type CatchCardProps = {
  item: Catch;
};

const CatchCard: FC<CatchCardProps> = ({item}) => {
  const {data: creator} = useProfile(item.created_by);
  const tw = useTailwind();
  const date = new Date(item.created_at);

  return (
    <View style={tw('px-2 py-4 bg-white rounded-sm')}>
      <Text>{date.toLocaleDateString()}</Text>
      <Text>av {creator?.username}</Text>
      <Text>{JSON.stringify(item.position.coordinates)}</Text>
    </View>
  );
};

export const FeedScreen = () => {
  const {data} = usePosts();
  const tw = useTailwind();

  if (!data) {
    return <View />;
  }

  return (
    <View>
      <FlatList<Catch>
        contentContainerStyle={tw(`p-4`)}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CatchCard item={item} />}
        ItemSeparatorComponent={() => <View style={tw(`my-2`)} />}
      />
    </View>
  );
};

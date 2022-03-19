import React, {FC} from 'react';
import {FlatList, View} from 'react-native';

import {Text} from '@/components/Text';

import {useProfile} from '@/features/account/hooks/useProfile';
import tw from '@/utils/tailwind';

import {usePosts} from '../hooks/usePosts';
import {Catch} from '../types';

type CatchCardProps = {
  item: Catch;
};

const CatchCard: FC<CatchCardProps> = ({item}) => {
  const {data: creator} = useProfile(item.created_by);
  const date = new Date(item.created_at);

  return (
    <View style={tw.style('p-2 ')}>
      <Text>{date.toLocaleDateString()}</Text>
      <Text>av {creator?.username}</Text>
      <Text>{JSON.stringify(item.position.coordinates)}</Text>
    </View>
  );
};

export const FeedScreen = () => {
  const {data} = usePosts();

  if (!data) {
    return <View />;
  }

  return (
    <View>
      <FlatList<Catch>
        contentContainerStyle={tw`p-4`}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CatchCard item={item} />}
        ItemSeparatorComponent={() => <View style={tw`my-2`} />}
      />
    </View>
  );
};

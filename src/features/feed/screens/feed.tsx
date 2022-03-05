import {Point} from 'geojson';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import {Text} from '@/components/Text';

import {supabase} from '@/utils/supabase';
import tw from '@/utils/tailwind';

type Catch = {
  id: number;
  created_by: string;
  created_at: string;
  data: any[];
  position: Point;
  trap_id: string;
};

type CatchCardProps = {
  item: Catch;
  index: number;
};

const CatchCard: FC<CatchCardProps> = ({item}) => {
  const date = new Date(item.created_at);

  return (
    <View style={tw.style('p-2')}>
      <Text>{date.toLocaleDateString()}</Text>
      <Text>{JSON.stringify(item.position.coordinates)}</Text>
      <Text>Fångst</Text>
      {item.data.map(c => (
        <Text key={c.id}>
          - {c.species}
          {c.size && `, ${c.size} ${c.size_unit}`} (x{c.amount})
        </Text>
      ))}
    </View>
  );
};

export const FeedScreen = () => {
  const [posts, setPosts] = useState<Catch[]>([]);

  const refreshPosts = useCallback(async () => {
    const {body} = await supabase.from<Catch>('catch').select('*').limit(5);

    console.log(body);

    setPosts(body ?? []);
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  return (
    <FlatList
      contentContainerStyle={tw`p-4`}
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={CatchCard}
      ItemSeparatorComponent={() => <View style={tw`my-2`} />}
    />
  );
};

import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {FlatList, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

import {useProfile} from '@/hooks/account';
import {usePosts} from '@/hooks/social';

import {Card} from '@/components';
import {Text} from '@/components/atoms/text';

import {SocialRoute} from '@/navigation/social-navigation';

import {Catch} from '@/types/social';

type CatchCardProps = {
  item: Catch;
};

const CatchCard: FC<CatchCardProps> = ({item}) => {
  const {data: creator} = useProfile(item.created_by);
  const navigation = useNavigation<SocialRoute>();
  const date = new Date(item.created_at);

  const navigateToPost = () => {
    navigation.navigate('post', {id: item.id});
  };

  return (
    <Card android_ripple onPress={navigateToPost}>
      <Text>{date.toLocaleDateString()}</Text>
      <Text>av {creator?.username}</Text>
      <Text>{JSON.stringify(item.position.coordinates)}</Text>
    </Card>
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

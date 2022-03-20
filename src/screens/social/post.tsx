import {useRoute} from '@react-navigation/native';
import React, {FC} from 'react';
import {View} from 'react-native';

import {usePost} from '@/hooks/social';

import {Text} from '@/components';

import {PostRoute} from '@/navigation/social-navigation';

const SocialPostScreen: FC = () => {
  const route = useRoute<PostRoute>();
  const {data: post} = usePost(route.params.id);

  if (!post) {
    return (
      <View>
        <Text>Laddar...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{JSON.stringify(post.data)}</Text>
    </View>
  );
};

export {SocialPostScreen};

import {useProfile} from 'api/account';
import {useAuth} from 'core';
import React from 'react';
import {Text, View} from 'ui';

type TrapAccessWidgetProps = {
  id: number;
  created_by: string;
};
export const TrapAccessWidget = ({id, created_by}: TrapAccessWidgetProps) => {
  const {data} = useProfile(created_by);
  const {uid} = useAuth();

  if (!data) return <View></View>;

  return (
    <View>
      <Text>
        Ägs av {created_by === uid ? 'dig' : data.username}
      </Text>
    </View>
  );
};

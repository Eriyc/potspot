import React, {ReactElement} from 'react';
import {GestureResponderEvent} from 'react-native';
import {ArrowLeft, X} from 'react-native-feather';

import {IconButton} from '../atoms';

type CloseButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  closeIcon?: boolean;
};
export const CloseButton = (props: CloseButtonProps): ReactElement => {
  const Icon = props.closeIcon ? X : ArrowLeft;

  return (
    <IconButton
      style={() => ({marginRight: 8})}
      icon={<Icon height={18} width={18} color="black" />}
      onPress={props.onPress}
    />
  );
};

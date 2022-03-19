import React, {FC} from 'react';
import {Text as RNText} from 'react-native';
import {Style} from 'twrnc/dist/esm/types';

import {useColorScheme} from '@/utils/colorScheme';
import tw from '@/utils/tailwind';

interface TextProps {
  style?: Style;
  invert?: boolean;
  onPress?: () => void;
}

const Text: FC<TextProps> = ({children, style, invert, ...props}) => {
  const [dark] = useColorScheme();

  return (
    <RNText
      {...props}
      style={{
        ...tw.style('text-black', (invert ? !dark : dark) && 'text-white'),
        ...style,
      }}>
      {children}
    </RNText>
  );
};

export {Text};

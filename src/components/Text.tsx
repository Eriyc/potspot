import React, {FC} from 'react';
import {Text as RNText} from 'react-native';
import {Style, useTailwind} from 'tailwind-rn';

interface TextProps {
  style?: Style;
  invert?: boolean;
  onPress?: () => void;
}

const Text: FC<TextProps> = ({children, style, ...props}) => {
  const tw = useTailwind();

  return (
    <RNText
      {...props}
      style={{
        ...tw('text-black dark:text-white'),
        ...style,
      }}>
      {children}
    </RNText>
  );
};

export {Text};

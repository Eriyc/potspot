import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTailwind} from 'tailwind-rn/dist';

export const Background: FC = ({children}) => {
  const tw = useTailwind();
  return (
    <LinearGradient
      style={tw(`flex-1 bg-purple-600`)}
      colors={['#7c3aed', '#9333ea']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {children}
    </LinearGradient>
  );
};

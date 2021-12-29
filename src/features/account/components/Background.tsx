import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';

export const Background: FC = ({children}) => (
  <LinearGradient
    style={tw`flex-1 bg-purple-600`}
    colors={[tw.color('bg-blue-400/30')!, tw.color('bg-purple-800/80')!]}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}>
    {children}
  </LinearGradient>
);

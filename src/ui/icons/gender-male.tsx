import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const GenderMale = ({color = 'black', ...props}: SvgProps) => (
  <Svg width={16} height={16} fill={color} viewBox="0 0 16 16" {...props}>
    <Path
      fill-rule="evenodd"
      d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
    />
  </Svg>
);

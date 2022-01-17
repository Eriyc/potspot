import React from 'react';
import {createContext, FC, useContext, useState} from 'react';
import {RnColorScheme, useAppColorScheme, useDeviceContext} from 'twrnc';

import tw from './tailwind';

type ColorSchemeContextValue = [boolean, () => void];

const ColorSchemeContext = createContext<ColorSchemeContextValue>(
  {} as ColorSchemeContextValue,
);

export const ColorSchemeProvider: FC = ({children}) => {
  useDeviceContext(tw, {withDeviceColorScheme: true});
  const [colorScheme] = useAppColorScheme(tw);
  const [theme, setTheme] = useState<RnColorScheme>(colorScheme);

  const toggleTheme = () =>
    setTheme(t => {
      const newTheme = t === 'light' ? 'dark' : 'light';
      tw.setColorScheme(newTheme);
      return newTheme;
    });

  return (
    <ColorSchemeContext.Provider value={[theme === 'dark', toggleTheme]}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
export const useColorScheme = () => useContext(ColorSchemeContext);

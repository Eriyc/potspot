import React from 'react';
import {createContext, FC, useContext, useState} from 'react';
import {useColorScheme as useRNColorScheme} from 'react-native';
import {TailwindProvider} from 'tailwind-rn/dist';

import utilities from '../../tailwind.json';

type Scheme = 'dark' | 'light' | 'system';
type ColorSchemeContextValue = [Scheme, (target: Scheme) => void];

const ColorSchemeContext = createContext<ColorSchemeContextValue>(
  {} as ColorSchemeContextValue,
);

export const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState<Scheme>('system');
  const preference = useRNColorScheme();

  const editTheme = (target: Scheme) => setTheme(target);

  const t = theme === 'system' ? preference ?? 'light' : theme;

  return (
    <ColorSchemeContext.Provider value={[theme, editTheme]}>
      <TailwindProvider utilities={utilities} colorScheme={t}>
        {children}
      </TailwindProvider>
    </ColorSchemeContext.Provider>
  );
};
export const useColorScheme = () => useContext(ColorSchemeContext);

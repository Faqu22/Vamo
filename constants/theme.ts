import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#2f95dc',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#2f95dc',
    primary: '#007AFF',
    secondary: '#FF9500',
    card: '#F9F9F9',
    border: '#D1D1D6',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
    primary: '#0A84FF',
    secondary: '#FF9F0A',
    card: '#1C1C1E',
    border: '#38383A',
  },
};

export const Fonts = {
  default: 'System',
  mono: 'System',
};

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.card,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: Colors.light.secondary,
  },
};

export const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.card,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: Colors.dark.secondary,
  },
};
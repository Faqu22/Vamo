import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Colors = {
  light: {
    text: '#0D2A3F',
    background: '#F7FAFC',
    tint: '#4CB7E7',
    icon: '#6B7B8A',
    tabIconDefault: '#6B7B8A',
    tabIconSelected: '#4CB7E7',
    primary: '#4CB7E7',
    secondary: '#F6C945',
    card: '#FFFFFF',
    border: '#C9D5DF',
    // Semantic colors
    success: '#21C07A',
    info: '#3A7CA5',
    warning: '#F6C945',
    error: '#FF5A5F',
    // Category colors
    social: '#4CB7E7',
    sport: '#21C07A',
    culture: '#7B61FF',
    outdoors: '#FF8A34',
    study: '#3A7CA5',
  },
  dark: {
    text: '#E6EDF3',
    background: '#0E1620',
    tint: '#5BC2EC',
    icon: '#AFC2D1',
    tabIconDefault: '#AFC2D1',
    tabIconSelected: '#5BC2EC',
    primary: '#5BC2EC',
    secondary: '#FFD25C',
    card: '#14202B',
    border: '#2A3241',
    // Semantic colors (using light versions for now)
    success: '#21C07A',
    info: '#3A7CA5',
    warning: '#F6C945',
    error: '#FF5A5F',
    // Category colors (using light versions for now)
    social: '#5BC2EC',
    sport: '#21C07A',
    culture: '#7B61FF',
    outdoors: '#FF8A34',
    study: '#3A7CA5',
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
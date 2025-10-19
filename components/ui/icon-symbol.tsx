import { MaterialIcons } from '@expo/vector-icons';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform } from 'react-native';

// Define a mapping for SF Symbols to Material Icons for Android/Web compatibility
const MAPPING = {
  'house.fill': 'home',
  'message.fill': 'chat',
  'person.fill': 'person',
  'map.fill': 'map',
  'square.stack.3d.up.fill': 'layers',
  'info.circle': 'info',
  'xmark.circle.fill': 'cancel',
  xmark: 'close',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'chevron.left': 'keyboard-arrow-left',
  'link.circle.fill': 'link',
  'questionmark.circle.fill': 'help',
  'person.2.fill': 'people',
  'checkmark.circle.fill': 'check-circle',
  magnifyingglass: 'search',
  'location.fill': 'my-location',
  'square.and.pencil': 'edit',
  plus: 'add',
  // Add more mappings as needed
};

export type IconSymbolName = keyof typeof MAPPING;

type SFSymbolProps = React.ComponentProps<typeof SymbolView>;

export type IconSymbolProps = Omit<SFSymbolProps, 'name'> & {
  name: IconSymbolName;
  size?: number;
  color?: string;
};

export function IconSymbol({ name, size = 24, color, ...rest }: IconSymbolProps) {
  if (Platform.OS === 'ios') {
    return <SymbolView name={name} size={size} tintColor={color} {...rest} />;
  }

  const materialIconName = MAPPING[name] as keyof typeof MaterialIcons.glyphMap;

  if (!materialIconName) {
    console.warn(`Missing Material Icon mapping for SF Symbol: ${name}`);
    return <MaterialIcons name="error" size={size} color={color} />;
  }

  return <MaterialIcons name={materialIconName} size={size} color={color} />;
}
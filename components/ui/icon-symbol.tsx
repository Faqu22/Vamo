import { MaterialIcons } from '@expo/vector-icons';
import { Symbol, SymbolProps } from 'expo-symbols';
import { Platform } from 'react-native';

// Define a mapping for SF Symbols to Material Icons for Android/Web compatibility
const MAPPING = {
  'house.fill': 'home',
  'square.stack.3d.up.fill': 'layers',
  'info.circle': 'info',
  'xmark.circle.fill': 'cancel',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'link.circle.fill': 'link',
  'questionmark.circle.fill': 'help',
  // Add more mappings as needed
};

export type IconSymbolName = keyof typeof MAPPING;

export type IconSymbolProps = Omit<SymbolProps, 'name'> & {
  name: IconSymbolName;
  size?: number;
  color?: string;
};

export function IconSymbol({ name, size = 24, color, ...rest }: IconSymbolProps) {
  if (Platform.OS === 'ios') {
    return <Symbol name={name} size={size} color={color} {...rest} />;
  }

  const materialIconName = MAPPING[name] as keyof typeof MaterialIcons.glyphMap;

  if (!materialIconName) {
    console.warn(`Missing Material Icon mapping for SF Symbol: ${name}`);
    return <MaterialIcons name="error" size={size} color={color} />;
  }

  return <MaterialIcons name={materialIconName} size={size} color={color} />;
}
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface OptionButtonProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
  fullWidth?: boolean;
}

export function OptionButton({ label, onPress, isActive, fullWidth = false }: OptionButtonProps) {
  const activeBg = useThemeColor({}, 'secondary');
  const inactiveBg = useThemeColor({}, 'card');
  const activeText = useThemeColor({ light: '#000', dark: '#000' }, 'text');
  const inactiveText = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isActive ? activeBg : inactiveBg,
          borderColor,
        },
        fullWidth && styles.fullWidth,
      ]}
    >
      <ThemedText style={{ color: isActive ? activeText : inactiveText, fontWeight: '500' }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    margin: 4,
    alignItems: 'center',
  },
  fullWidth: {
    flex: 1,
  },
});
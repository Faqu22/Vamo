import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FilterButtonProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
}

export function FilterButton({ label, onPress, isActive }: FilterButtonProps) {
  const activeBg = useThemeColor({}, 'primary');
  const inactiveBg = useThemeColor({}, 'card');
  const activeText = useThemeColor({ light: '#fff', dark: '#fff' }, 'text');
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
      ]}
    >
      <ThemedText style={{ color: isActive ? activeText : inactiveText }}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
});
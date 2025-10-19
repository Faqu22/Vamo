import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface InterestPillProps {
  label: string;
  onRemove?: () => void;
}

export function InterestPill({ label, onRemove }: InterestPillProps) {
  const backgroundColor = useThemeColor({ light: '#e9f6fc', dark: '#1c2a3a' }, 'background');
  const textColor = useThemeColor({}, 'primary');

  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <ThemedText style={[styles.label, { color: textColor }]}>{label}</ThemedText>
      {onRemove && (
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <IconSymbol name="xmark" size={14} color={textColor} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 8,
    padding: 2,
  },
});
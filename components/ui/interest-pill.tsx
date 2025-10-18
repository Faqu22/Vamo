import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function InterestPill({ label }: { label: string }) {
  const backgroundColor = useThemeColor({ light: '#e9f6fc', dark: '#1c2a3a' }, 'background');
  const textColor = useThemeColor({}, 'primary');

  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <ThemedText style={[styles.label, { color: textColor }]}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
  },
});
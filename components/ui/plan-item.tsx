import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Plan } from '@/mocksdata/plans';

interface PlanItemProps {
  item: Plan;
  onPress: () => void;
}

export function PlanItem({ item, onPress }: PlanItemProps) {
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.planItem, { backgroundColor: cardColor, borderColor }]}>
        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
        <ThemedText>{item.description}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  planItem: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
});
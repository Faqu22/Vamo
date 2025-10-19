import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Plan } from '@/types/plan';

interface PlanItemProps {
  item: Plan;
  onPress: () => void;
}

const CATEGORY_DETAILS: Record<string, { color: keyof typeof Colors.light }> = {
  sport: { color: 'sport' },
  social: { color: 'social' },
  culture: { color: 'culture' },
  outdoors: { color: 'outdoors' },
  study: { color: 'study' },
  default: { color: 'primary' },
};

export function PlanItem({ item, onPress }: PlanItemProps) {
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const secondaryTextColor = useThemeColor({}, 'icon');

  const categoryInfo = CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.default;
  const categoryColor = useThemeColor({}, categoryInfo.color);
  const categoryIcon = 'person.2.fill';

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <View style={[styles.categoryStripe, { backgroundColor: categoryColor }]} />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
              <IconSymbol name={categoryIcon} size={20} color="#fff" />
            </View>
            <View style={styles.headerText}>
              <ThemedText type="defaultSemiBold" numberOfLines={1}>
                {item.activity}
              </ThemedText>
              <ThemedText style={{ color: secondaryTextColor, fontSize: 14 }} numberOfLines={1}>
                {item.location_name}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.description} numberOfLines={2}>
            {item.description}
          </ThemedText>
          <View style={styles.footer}>
            <View style={styles.participants}>
              <IconSymbol name="person.fill" size={16} color={secondaryTextColor} />
              <ThemedText style={[styles.footerText, { color: secondaryTextColor }]}>
                {item.participantCount || 1}/{item.capacity}
              </ThemedText>
            </View>
            {item.creator && (
              <View style={styles.creator}>
                <ThemedText style={[styles.footerText, { color: secondaryTextColor }]}>
                  Creado por {item.creator.name}
                </ThemedText>
                <Image
                  source={{ uri: item.creator.profilePictureUrl }}
                  style={styles.creatorAvatar}
                />
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  categoryStripe: {
    width: 8,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  description: {
    marginBottom: 12,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '500',
  },
  creatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
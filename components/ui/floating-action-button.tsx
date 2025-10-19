import { Pressable, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName: IconSymbolName;
  bottomPosition: number;
  side?: 'left' | 'right';
}

export function FloatingActionButton({
  onPress,
  iconName,
  bottomPosition,
  side = 'right',
}: FloatingActionButtonProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const iconColor = useThemeColor({}, 'primary');

  return (
    <ThemedView
      style={[
        styles.container,
        { bottom: bottomPosition, backgroundColor },
        side === 'right' ? { right: 20 } : { left: 20 },
      ]}
    >
      <Pressable onPress={onPress} style={styles.pressable}>
        <IconSymbol name={iconName} size={24} color={iconColor} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10, // Aumentado para asegurar que esté siempre encima
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
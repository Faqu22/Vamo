import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Collapsible({ children, title }: { children: React.ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const height = useSharedValue(0);
  const colorScheme = useColorScheme() ?? 'light';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const onToggle = () => {
    setIsOpen(!isOpen);
    height.value = withTiming(isOpen ? 0 : 1000, { duration: 200 }); // Use a large number for height
  };

  return (
    <ThemedView>
      <Pressable onPress={onToggle} style={styles.header}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <IconSymbol
          name={isOpen ? 'chevron.up' : 'chevron.down'}
          size={24}
          color={Colors[colorScheme].icon}
        />
      </Pressable>
      <Animated.View style={[styles.content, animatedStyle]}>
        <ThemedView style={styles.paddingView}>{children}</ThemedView>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    overflow: 'hidden',
  },
  paddingView: {
    paddingVertical: 10,
  },
});
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CreatePlanPageLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onNext: () => void;
  isFinalStep?: boolean;
  isPublishing?: boolean;
}

const TOTAL_STEPS = 5;

export function CreatePlanPageLayout({
  children,
  currentStep,
  onNext,
  isFinalStep = false,
  isPublishing = false,
}: CreatePlanPageLayoutProps) {
  const router = useRouter();
  const cardColor = useThemeColor({}, 'card');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: cardColor }]}>
      <View style={styles.header}>
        {currentStep > 1 ? (
          <Pressable onPress={() => router.back()} style={styles.headerButton}>
            <IconSymbol name="chevron.left" size={24} color={iconColor} />
          </Pressable>
        ) : (
          <View style={styles.headerButton} />
        )}
        <ThemedText type="subtitle">Crear plan</ThemedText>
        <Pressable onPress={() => router.dismissAll()} style={styles.headerButton}>
          <IconSymbol name="xmark" size={20} color={iconColor} />
        </Pressable>
      </View>

      <View style={styles.progressContainer}>
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          return (
            <View
              key={index}
              style={[
                styles.progressStep,
                {
                  backgroundColor: isActive ? primaryColor : backgroundColor,
                  borderColor: isActive ? primaryColor : iconColor,
                },
              ]}
            >
              <ThemedText style={{ color: isActive ? '#fff' : iconColor }}>
                {stepNumber}
              </ThemedText>
            </View>
          );
        })}
      </View>

      <View style={styles.content}>{children}</View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, { backgroundColor: primaryColor }]}
          onPress={onNext}
          disabled={isPublishing}
        >
          {isPublishing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.nextButtonText}>
              {isFinalStep ? 'Publicar plan' : 'Siguiente'}
            </ThemedText>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 15,
  },
  progressStep: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nextButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
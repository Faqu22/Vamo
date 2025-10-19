import { Modal, Pressable, StyleSheet, } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Plan } from '@/types/plan';

interface PlanDetailModalProps {
  plan: Plan;
  onClose: () => void;
}

export function PlanDetailModal({ plan, onClose }: PlanDetailModalProps) {
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Modal animationType="fade" transparent={true} visible={true} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.modalContainer, { backgroundColor: cardColor }]}>
          <ThemedView style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <IconSymbol name="xmark.circle.fill" size={28} color={iconColor} />
            </Pressable>
            <ThemedText type="title" style={styles.title}>
              {plan.activity}
            </ThemedText>
            <ThemedText style={styles.description}>{plan.description}</ThemedText>
            <Pressable style={[styles.joinButton, { backgroundColor: primaryColor }]}>
              <ThemedText style={styles.joinButtonText}>Unirme al Plan</ThemedText>
            </Pressable>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 1,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
  },
  description: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 16,
  },
  joinButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
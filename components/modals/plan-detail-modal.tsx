import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Plan } from '@/types/plan';

interface PlanDetailModalProps {
  plan: Plan;
  onClose: () => void;
}

// Helper function to format time details
const formatTime = (plan: Plan) => {
  if (plan.when === 'Ahora') {
    return `Ahora • ${plan.duration} min`;
  }
  if (plan.when === 'Hoy' && plan.availabilityStart && plan.availabilityEnd) {
    return `Hoy, de ${plan.availabilityStart} a ${plan.availabilityEnd}`;
  }
  return 'Horario no especificado';
};

// Helper function to format location details
const formatLocation = (plan: Plan) => {
  let locationString = plan.location_name;
  if (plan.location_address) {
    locationString += `\n${plan.location_address}`;
  }
  return locationString || 'Lugar no especificado';
};

// Helper function to format participants and preferences
const formatParticipants = (plan: Plan) => {
  const currentParticipants = plan.participantCount !== undefined ? plan.participantCount : 1; // Assume creator is 1 participant if not specified
  const capacity = plan.capacity !== undefined ? plan.capacity : 'ilimitado';
  let participantString = `${currentParticipants} / ${capacity} personas`;

  const ageRange = plan.age_range_min && plan.age_range_max ? `${plan.age_range_min}-${plan.age_range_max} años` : '';
  const genderMap: Record<string, string> = {
    any: 'Sin preferencia',
    male: 'Masculino',
    female: 'Femenino',
  };
  const genderPreference = genderMap[plan.gender_preference] || 'Sin preferencia';

  const details = [ageRange, genderPreference].filter(Boolean).join(', ');
  if (details) {
    participantString += `\n(${details})`;
  }
  return participantString;
};

export function PlanDetailModal({ plan, onClose }: PlanDetailModalProps) {
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({}, 'border');
  const secondaryTextColor = useThemeColor({}, 'icon');
  const flexibleTagBgColor = useThemeColor({ light: '#e9f6fc', dark: '#1c2a3a' }, 'background'); // Similar to InterestPill

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

            {/* Horario Section */}
            <ThemedView style={[styles.sectionCard, { borderColor }]}>
              <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: secondaryTextColor }]}>
                Horario
              </ThemedText>
              <ThemedText style={styles.sectionValue}>{formatTime(plan)}</ThemedText>
            </ThemedView>

            {/* Lugar Section */}
            <ThemedView style={[styles.sectionCard, { borderColor }]}>
              <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: secondaryTextColor }]}>
                Lugar
              </ThemedText>
              <ThemedText style={styles.sectionValue}>{formatLocation(plan)}</ThemedText>
            </ThemedView>

            {/* Personas Section */}
            <ThemedView style={[styles.sectionCard, { borderColor }]}>
              <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: secondaryTextColor }]}>
                Personas
              </ThemedText>
              <ThemedText style={styles.sectionValue}>{formatParticipants(plan)}</ThemedText>
            </ThemedView>

            {/* Flexible Plan Tag */}
            {plan.is_flexible && (
              <ThemedView style={[styles.flexibleTag, { backgroundColor: flexibleTagBgColor }]}>
                <ThemedText style={[styles.flexibleText, { color: primaryColor }]}>Plan Flexible</ThemedText>
              </ThemedView>
            )}

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
  sectionCard: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  sectionValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  flexibleTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  flexibleText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  joinButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
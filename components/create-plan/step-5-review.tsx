import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setCurrentStep: (step: number) => void;
}

interface ReviewRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function ReviewRow({ label, value, onEdit }: ReviewRowProps) {
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryTextColor = useThemeColor({}, 'icon');

  return (
    <View style={[styles.reviewRow, { backgroundColor: cardColor, borderColor }]}>
      <View style={styles.reviewInfo}>
        <ThemedText style={[styles.reviewLabel, { color: secondaryTextColor }]}>{label}</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.reviewValue}>
          {value}
        </ThemedText>
      </View>
      <Pressable onPress={onEdit} style={styles.editButton}>
        <ThemedText style={{ color: primaryColor, fontWeight: '600' }}>Editar</ThemedText>
      </Pressable>
    </View>
  );
}

export function Step5Review({ planData, setCurrentStep }: Props) {
  const getTimeValue = () => {
    if (planData.when === 'Ahora') {
      return `Ahora • ${planData.duration || '...'} min`;
    }
    if (planData.when === 'Hoy') {
      const start = planData.availabilityStart || '...';
      const end = planData.availabilityEnd || '...';
      return `Hoy, de ${start} a ${end}`;
    }
    return 'Sin especificar';
  };

  const getLocationValue = () => {
    if (!planData.location?.name) {
      return 'Sin especificar';
    }
    let value = `${planData.location.name}`;
    if (planData.location.address) {
      value += `\n${planData.location.address}`;
    }
    if (planData.locationDescription) {
      value += `\n\n"${planData.locationDescription}"`;
    }
    return value;
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Revisá y publicá</ThemedText>
      <ReviewRow
        label="Actividad"
        value={planData.activity || 'Sin especificar'}
        onEdit={() => setCurrentStep(1)}
      />
      <ReviewRow
        label="Cuándo y duración"
        value={getTimeValue()}
        onEdit={() => setCurrentStep(2)}
      />
      <ReviewRow
        label="Lugar"
        value={getLocationValue()}
        onEdit={() => setCurrentStep(3)}
      />
      <ReviewRow
        label="Preferencias"
        value={`Cupo: ${planData.capacity}, ${planData.visibility}`}
        onEdit={() => setCurrentStep(4)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  reviewInfo: {
    flex: 1,
    marginRight: 10,
  },
  reviewLabel: {
    marginBottom: 4,
    fontSize: 14,
  },
  reviewValue: {
    lineHeight: 22,
  },
  editButton: {
    paddingTop: 2,
  },
});
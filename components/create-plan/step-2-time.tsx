import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { OptionButton } from '@/components/ui/option-button';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface Props {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const WHEN_OPTIONS: NewPlan['when'][] = ['Ahora', 'Hoy'];
const DURATION_OPTIONS = [20, 30, 45, 60];

export function Step2Time({ planData, setPlanData }: Props) {
  const secondaryTextColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const placeholderColor = useThemeColor({ light: '#999', dark: '#777' }, 'icon');

  const [showPickerFor, setShowPickerFor] = useState<'start' | 'end' | null>(null);

  const handleWhenChange = (when: NewPlan['when']) => {
    if (when === 'Ahora') {
      setPlanData((prev) => ({
        ...prev,
        when,
        availabilityStart: undefined,
        availabilityEnd: undefined,
        duration: prev.duration || 30,
      }));
    } else {
      setPlanData((prev) => ({
        ...prev,
        when,
        duration: undefined,
      }));
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPickerFor(null);
    if (event.type === 'set' && selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      if (showPickerFor === 'start') {
        setPlanData((prev) => ({ ...prev, availabilityStart: formattedTime }));
      } else {
        setPlanData((prev) => ({ ...prev, availabilityEnd: formattedTime }));
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Cuándo y cuánto dura</ThemedText>
      <ThemedText style={[styles.subtitle, { color: secondaryTextColor }]}>
        Define la disponibilidad para tu plan
      </ThemedText>

      <ThemedText style={styles.label}>Cuándo</ThemedText>
      <View style={styles.optionsContainer}>
        {WHEN_OPTIONS.map((item) => (
          <OptionButton
            key={item}
            label={item}
            isActive={planData.when === item}
            onPress={() => handleWhenChange(item)}
          />
        ))}
      </View>

      {planData.when === 'Ahora' && (
        <>
          <ThemedText style={styles.label}>
            Tu disponibilidad actual{' '}
            <ThemedText style={{ color: primaryColor, fontWeight: 'bold' }}>
              {planData.duration} min
            </ThemedText>
          </ThemedText>
          <View style={styles.optionsContainer}>
            {DURATION_OPTIONS.map((item) => (
              <OptionButton
                key={item}
                label={`${item}'`}
                isActive={planData.duration === item}
                onPress={() => setPlanData((prev) => ({ ...prev, duration: item }))}
              />
            ))}
          </View>
        </>
      )}

      {planData.when === 'Hoy' && (
        <>
          <ThemedText style={styles.label}>Disponibilidad horaria</ThemedText>
          <View style={styles.timeRangeContainer}>
            <Pressable
              style={[styles.input, { backgroundColor: cardColor, borderColor }]}
              onPress={() => setShowPickerFor('start')}
            >
              <ThemedText style={{ color: planData.availabilityStart ? textColor : placeholderColor }}>
                {planData.availabilityStart || 'Desde (ej: 14:00)'}
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.input, { backgroundColor: cardColor, borderColor }]}
              onPress={() => setShowPickerFor('end')}
            >
              <ThemedText style={{ color: planData.availabilityEnd ? textColor : placeholderColor }}>
                {planData.availabilityEnd || 'Hasta (ej: 16:00)'}
              </ThemedText>
            </Pressable>
          </View>
        </>
      )}

      {showPickerFor && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'clock'}
          onChange={onTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    justifyContent: 'center',
  },
});
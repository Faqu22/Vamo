import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Step1Activity } from '@/components/create-plan/step-1-activity';
import { Step2Time } from '@/components/create-plan/step-2-time';
import { Step3Location } from '@/components/create-plan/step-3-location';
import { Step4Preferences } from '@/components/create-plan/step-4-preferences';
import { Step5Review } from '@/components/create-plan/step-5-review';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { NewPlan } from '@/types/new-plan';

interface CreatePlanModalProps {
  onClose: () => void;
}

const TOTAL_STEPS = 5;

export function CreatePlanModal({ onClose }: CreatePlanModalProps) {
  const cardColor = useThemeColor({}, 'card');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');

  const [currentStep, setCurrentStep] = useState(1);
  const [planData, setPlanData] = useState<Partial<NewPlan>>({
    activity: '',
    when: 'Ahora',
    duration: 30,
    capacity: 3,
    womenOnly: false,
    ageRange: '18-24',
    visibility: 'Público',
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Publicando plan:', planData);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Activity planData={planData} setPlanData={setPlanData} />;
      case 2:
        return <Step2Time planData={planData} setPlanData={setPlanData} />;
      case 3:
        return <Step3Location planData={planData} setPlanData={setPlanData} />;
      case 4:
        return <Step4Preferences planData={planData} setPlanData={setPlanData} />;
      case 5:
        return <Step5Review planData={planData} setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={true} onRequestClose={onClose}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: cardColor }]}>
        <View style={styles.header}>
          {currentStep > 1 ? (
            <Pressable onPress={handleBack} style={styles.headerButton}>
              <IconSymbol name="chevron.left" size={24} color={iconColor} />
            </Pressable>
          ) : (
            <View style={styles.headerButton} />
          )}
          <ThemedText type="subtitle">Crear plan</ThemedText>
          <Pressable onPress={onClose} style={styles.headerButton}>
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

        <View style={styles.content}>{renderStep()}</View>

        <View style={styles.footer}>
          <Pressable
            style={[styles.nextButton, { backgroundColor: primaryColor }]}
            onPress={handleNext}
          >
            <ThemedText style={styles.nextButtonText}>
              {currentStep === TOTAL_STEPS ? 'Publicar plan' : 'Siguiente'}
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useSWRConfig } from 'swr';

import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { Step5Review } from '@/components/create-plan/step-5-review';
import { useCreatePlan } from '@/contexts/create-plan-context';
import { fetcherPost } from '@/lib/axios';

export default function CreatePlanStep5Screen() {
  const router = useRouter();
  const { planData, resetPlanData } = useCreatePlan();
  const { mutate } = useSWRConfig();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (isPublishing) return;

    setIsPublishing(true);
    try {
      await fetcherPost('/plans', planData);

      // Revalida la consulta de planes para que el nuevo plan aparezca en el mapa
      mutate('/plans');

      Alert.alert('¡Éxito!', 'Tu plan ha sido publicado correctamente.', [
        {
          text: 'OK',
          onPress: () => {
            // Resetear el estado del formulario y cerrar el modal
            resetPlanData();
            router.dismissAll();
            router.back()
          },
        },
      ]);
    } catch (error: any) {
      console.error('Failed to publish plan:', error);
      Alert.alert(
        'Error al publicar',
        error.message || 'No se pudo publicar el plan. Inténtalo de nuevo.'
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <CreatePlanPageLayout
      currentStep={5}
      onNext={handlePublish}
      isFinalStep
      isPublishing={isPublishing}
    >
      <Step5Review
        planData={planData}
        setCurrentStep={(step) => router.push(`/(create-plan)/step${step}` as any)}
      />
    </CreatePlanPageLayout>
  );
}
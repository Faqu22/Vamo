import { useRouter } from 'expo-router';

import { Step4Preferences } from '@/components/create-plan/step-4-preferences';
import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { useCreatePlan } from '@/contexts/create-plan-context';

export default function CreatePlanStep4Screen() {
  const router = useRouter();
  const { planData, setPlanData } = useCreatePlan();

  return (
    <CreatePlanPageLayout currentStep={4} onNext={() => router.push('/(create-plan)/step5')}>
      <Step4Preferences planData={planData} setPlanData={setPlanData} />
    </CreatePlanPageLayout>
  );
}
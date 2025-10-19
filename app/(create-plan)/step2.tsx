import { useRouter } from 'expo-router';

import { Step2Time } from '@/components/create-plan/step-2-time';
import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { useCreatePlan } from '@/contexts/create-plan-context';

export default function CreatePlanStep2Screen() {
  const router = useRouter();
  const { planData, setPlanData } = useCreatePlan();

  return (
    <CreatePlanPageLayout currentStep={2} onNext={() => router.push('/(create-plan)/step3')}>
      <Step2Time planData={planData} setPlanData={setPlanData} />
    </CreatePlanPageLayout>
  );
}
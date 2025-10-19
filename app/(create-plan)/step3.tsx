import { useRouter } from 'expo-router';

import { Step3Location } from '@/components/create-plan/step-3-location';
import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { useCreatePlan } from '@/contexts/create-plan-context';

export default function CreatePlanStep3Screen() {
  const router = useRouter();
  const { planData, setPlanData } = useCreatePlan();

  return (
    <CreatePlanPageLayout currentStep={3} onNext={() => router.push('/(create-plan)/step4')}>
      <Step3Location planData={planData} setPlanData={setPlanData} />
    </CreatePlanPageLayout>
  );
}
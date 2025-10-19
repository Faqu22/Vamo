import { useRouter } from 'expo-router';

import { Step1Activity } from '@/components/create-plan/step-1-activity';
import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { useCreatePlan } from '@/contexts/create-plan-context';

export default function CreatePlanStep1Screen() {
  const router = useRouter();
  const { planData, setPlanData } = useCreatePlan();

  return (
    <CreatePlanPageLayout currentStep={1} onNext={() => router.push('/(create-plan)/step2')}>
      <Step1Activity planData={planData} setPlanData={setPlanData} />
    </CreatePlanPageLayout>
  );
}
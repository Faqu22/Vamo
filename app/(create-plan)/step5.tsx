import { useRouter } from 'expo-router';

import { Step5Review } from '@/components/create-plan/step-5-review';
import { CreatePlanPageLayout } from '@/components/create-plan/create-plan-page-layout';
import { useCreatePlan } from '@/contexts/create-plan-context';

export default function CreatePlanStep5Screen() {
  const router = useRouter();
  const { planData } = useCreatePlan();

  const handlePublish = () => {
    console.log('Publicando plan:', planData);
    router.dismissAll();
  };

  return (
    <CreatePlanPageLayout currentStep={5} onNext={handlePublish} isFinalStep>
      <Step5Review
        planData={planData}
        setCurrentStep={(step) => router.push(`/(create-plan)/step${step}` as any)}
      />
    </CreatePlanPageLayout>
  );
}
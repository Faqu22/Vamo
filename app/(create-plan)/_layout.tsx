import { Stack } from 'expo-router';
import { CreatePlanProvider } from '@/contexts/create-plan-context';

export default function CreatePlanLayout() {
  return (
    <CreatePlanProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CreatePlanProvider>
  );
}
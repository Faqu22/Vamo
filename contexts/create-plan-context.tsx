import { createContext, useContext, useState } from 'react';
import { NewPlan } from '@/types/new-plan';

interface CreatePlanContextType {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
}

const CreatePlanContext = createContext<CreatePlanContextType | undefined>(undefined);

const initialState: Partial<NewPlan> = {
  activity: '',
  when: 'Ahora',
  duration: 30,
  capacity: 3,
  womenOnly: false,
  ageRange: '18-24',
  visibility: 'Público',
};

export function CreatePlanProvider({ children }: { children: React.ReactNode }) {
  const [planData, setPlanData] = useState<Partial<NewPlan>>(initialState);

  return (
    <CreatePlanContext.Provider value={{ planData, setPlanData }}>
      {children}
    </CreatePlanContext.Provider>
  );
}

export function useCreatePlan() {
  const context = useContext(CreatePlanContext);
  if (!context) {
    throw new Error('useCreatePlan must be used within a CreatePlanProvider');
  }
  return context;
}
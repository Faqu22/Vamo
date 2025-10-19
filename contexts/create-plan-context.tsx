import { createContext, useContext, useState } from 'react';
import { NewPlan } from '@/types/new-plan';

interface CreatePlanContextType {
  planData: Partial<NewPlan>;
  setPlanData: React.Dispatch<React.SetStateAction<Partial<NewPlan>>>;
  resetPlanData: () => void;
}

const CreatePlanContext = createContext<CreatePlanContextType | undefined>(undefined);

const initialState: Partial<NewPlan> = {
  activity: '',
  when: 'Ahora',
  duration: 30,
  capacity: 3,
  genderPreference: 'any',
  ageRange: { min: 18, max: 99 },
  isFlexible: false,
  visibility: 'Público',
};

export function CreatePlanProvider({ children }: { children: React.ReactNode }) {
  const [planData, setPlanData] = useState<Partial<NewPlan>>(initialState);

  const resetPlanData = () => {
    setPlanData(initialState);
  };

  return (
    <CreatePlanContext.Provider value={{ planData, setPlanData, resetPlanData }}>
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
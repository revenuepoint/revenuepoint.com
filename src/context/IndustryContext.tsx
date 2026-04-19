'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type IndustryId =
  | 'manufacturing'
  | 'pharmacy'
  | 'distribution'
  | 'nonprofit'
  | 'healthcare'
  | 'propertyManagement'
  | 'professionalServices'
  | 'financialServices'
  | 'foodBeverage'
  | 'construction';

export const DEFAULT_INDUSTRY: IndustryId = 'manufacturing';

type IndustryContextValue = {
  industryId: IndustryId;
  setIndustryId: (id: IndustryId) => void;
};

const IndustryContext = createContext<IndustryContextValue>({
  industryId: DEFAULT_INDUSTRY,
  setIndustryId: () => undefined,
});

export function IndustryProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryIdState] = useState<IndustryId>(DEFAULT_INDUSTRY);
  const setIndustryId = useCallback((id: IndustryId) => setIndustryIdState(id), []);
  return (
    <IndustryContext.Provider value={{ industryId, setIndustryId }}>
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  return useContext(IndustryContext);
}

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type CrmId = 'salesforce' | 'hubspot' | 'dynamics' | 'custom';

export const DEFAULT_CRM: CrmId = 'salesforce';

export const crmMeta: Record<CrmId, { label: string; short: string }> = {
  salesforce: { label: 'Salesforce', short: 'Salesforce' },
  hubspot: { label: 'HubSpot', short: 'HubSpot' },
  dynamics: { label: 'Microsoft Dynamics 365', short: 'Dynamics' },
  custom: { label: 'Custom or legacy CRM', short: 'Custom / Legacy' },
};

type CrmContextValue = {
  crmId: CrmId;
  setCrmId: (id: CrmId) => void;
};

const CrmContext = createContext<CrmContextValue>({
  crmId: DEFAULT_CRM,
  setCrmId: () => undefined,
});

export function CrmProvider({ children }: { children: ReactNode }) {
  const [crmId, setCrmIdState] = useState<CrmId>(DEFAULT_CRM);
  const setCrmId = useCallback((id: CrmId) => setCrmIdState(id), []);
  return (
    <CrmContext.Provider value={{ crmId, setCrmId }}>
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  return useContext(CrmContext);
}

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { GatewayTenantId } from '@/types/gateway';

export const DEFAULT_TENANT: GatewayTenantId = 'acme';

type TenantContextValue = {
  tenantId: GatewayTenantId;
  setTenantId: (id: GatewayTenantId) => void;
};

const TenantContext = createContext<TenantContextValue>({
  tenantId: DEFAULT_TENANT,
  setTenantId: () => undefined,
});

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantIdState] = useState<GatewayTenantId>(DEFAULT_TENANT);
  const setTenantId = useCallback((id: GatewayTenantId) => setTenantIdState(id), []);
  return (
    <TenantContext.Provider value={{ tenantId, setTenantId }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}

import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { API } from '../constants/api';
import {
  featuredFrom,
  teamByExpertise,
  teamBySlugFrom,
  teamSectionsFrom,
  type TeamMember,
  type TeamSection,
} from '../data/team';
import type { ExpertiseTag } from '../data/topics';

type EmployeesResponse = {
  ok?: boolean;
  employees?: TeamMember[];
};

type EmployeesState = {
  employees: TeamMember[];
  status: 'loading' | 'ready' | 'error';
};

const EmployeesContext = createContext<EmployeesState>({
  employees: [],
  status: 'loading',
});

export function EmployeesProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<TeamMember[]>([]);
  const [status, setStatus] = useState<EmployeesState['status']>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch(API.employees, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('employees request failed'))))
      .then((data: EmployeesResponse) => {
        if (data.ok && Array.isArray(data.employees)) {
          setEmployees(data.employees);
          setStatus('ready');
          return;
        }
        setStatus('error');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ employees, status }), [employees, status]);
  return createElement(EmployeesContext.Provider, { value }, children);
}

export function useEmployees(): EmployeesState & {
  featured?: TeamMember;
  sections: TeamSection[];
  bySlug: Map<string, TeamMember>;
  specialists: (tags?: ExpertiseTag[]) => TeamMember[];
} {
  const { employees, status } = useContext(EmployeesContext);
  return useMemo(
    () => ({
      employees,
      status,
      featured: featuredFrom(employees),
      sections: teamSectionsFrom(employees),
      bySlug: teamBySlugFrom(employees),
      specialists: (tags?: ExpertiseTag[]) => teamByExpertise(tags, employees),
    }),
    [employees, status],
  );
}

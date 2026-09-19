import type { Request, Response } from 'express';

export type EmployeeRecord = {
  slug: string;
  name: string;
  role: string;
  section: 'investment' | 'business' | 'investors';
  photo?: string;
  about: string;
  results: string[];
  credentials: string[];
  languages: string[];
  regulatoryNote?: string;
  finmaAdviserNo?: string;
  cfaRegistryNo?: string;
  expertise: string[];
  featured: boolean;
};

export function employeesBucket(): string;
export function employeePublicPhotoPath(slug: string): string;
export function employeeStorageKey(storagePath: unknown, slug?: string): string;
export function employeeStorageUrl(storagePath: unknown, slug?: string): string;
export function employeeFromRow(row: unknown): EmployeeRecord | null;
export function listEmployees(): Promise<EmployeeRecord[]>;
export function employeeBySlug(slug: string): Promise<EmployeeRecord | null>;
export function readEmployeePhoto(slug: string): Promise<{ bytes: Buffer; type: string } | null>;
export function sendEmployeePhoto(req: Request, res: Response): Promise<void>;

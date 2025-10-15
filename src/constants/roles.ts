// constants/roles.ts
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  PHARMACIST: 'pharmacist',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES]; 

// constants/roles.ts
export const ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator', 
  PHARMACIST: 'pharmacist',

} as const;

export type Role = typeof ROLES[keyof typeof ROLES];


export const ADMIN_PANEL_ACCESS: Role[] = [ROLES.ADMIN, ROLES.MODERATOR];
export const PHARMACY_ACCESS: Role[] = [ROLES.PHARMACIST, ROLES.ADMIN];

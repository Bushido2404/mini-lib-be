export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
} as const;

// Optional: buat type dari constant ini
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

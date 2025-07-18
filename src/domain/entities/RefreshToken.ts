export type RefreshToken = {
  id: string;
  userId: string;
  issuedAt: Date;
  expiresAt: Date | string;
  roleId?: string;
};

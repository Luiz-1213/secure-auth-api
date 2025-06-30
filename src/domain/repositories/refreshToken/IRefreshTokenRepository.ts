import { RefreshToken } from '../../entities/RefreshToken';

export interface ICreateToken {
  userId: string;
  expiresAt: Date;
}

export interface IRefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  create({ userId, expiresAt }: ICreateToken): Promise<RefreshToken>;
  deleteById(id: string): Promise<void>;
}

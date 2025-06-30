import { IRefreshTokenRepository } from '../../domain/repositories/refreshToken/IRefreshTokenRepository';
import { EXP_TIME_IN_DAYS } from '../config/constants';

import { TokenService } from './TokenService';

interface IInput {
  userId: string;
  roleId: string;
}

export class AuthService {
  constructor(
    private readonly refreshTokenRepo: IRefreshTokenRepository,
    private readonly tokenService: TokenService,
  ) {}

  async generateTokens({ userId, roleId }: IInput) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const [accessToken, refreshToken] = await Promise.all([
      await this.tokenService.generate({
        id: userId,
        role: roleId,
      }),
      await this.refreshTokenRepo.create({
        userId: userId,
        expiresAt,
      }),
    ]);

    return { accessToken, refreshToken: refreshToken.id };
  }
}

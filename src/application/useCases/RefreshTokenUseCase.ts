import { IRefreshTokenRepository } from '../../domain/repositories/refreshToken/IRefreshTokenRepository';
import { InvalidRefreshToken } from '../errors/InvalidRefreshToken';
import { AuthService } from '../services/AuthService';

export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepo: IRefreshTokenRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(refreshTokenId: string) {
    const currentRefreshToken =
      await this.refreshTokenRepo.findById(refreshTokenId);

    if (!currentRefreshToken) {
      throw new InvalidRefreshToken();
    }

    if (Date.now().toString() >= currentRefreshToken.expiresAt) {
      throw new InvalidRefreshToken();
    }

    await this.refreshTokenRepo.deleteById(refreshTokenId);

    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        userId: currentRefreshToken.userId,
        roleId: currentRefreshToken.roleId!,
      },
    );

    return { accessToken, refreshToken };
  }
}

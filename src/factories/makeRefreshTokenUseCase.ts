import { RefreshTokenUseCase } from '../application/useCases/RefreshTokenUseCase';

import { makeAuthService } from './makeAuthService';
import { makePrismaRefreshTokenRepository } from './makePrismaRefreshTokenRepository';

export function makeRefreshTokenUseCase() {
  const refreshTokenRepo = makePrismaRefreshTokenRepository();
  const authService = makeAuthService();

  return new RefreshTokenUseCase(refreshTokenRepo, authService);
}

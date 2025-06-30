import { AuthService } from '../application/services/AuthService';

import { makePrismaRefreshTokenRepository } from './makePrismaRefreshTokenRepository';
import { makeTokenService } from './makeTokenService';

export function makeAuthService() {
  const refreshTokenRepo = makePrismaRefreshTokenRepository();
  const tokenService = makeTokenService();

  return new AuthService(refreshTokenRepo, tokenService);
}

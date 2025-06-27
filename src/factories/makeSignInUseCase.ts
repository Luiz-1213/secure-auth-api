import { SignInUseCase } from '../application/useCases/SignInUseCase';

import { makePrismaRefreshTokenRepository } from './makePrismaRefreshTokenRepository';
import { makePrismaUserRepository } from './makePrismaUserRepository';
import { makeTokenService } from './makeTokenService';

export function makeSignInUseCase() {
  const usersRepo = makePrismaUserRepository();
  const refreshTokenRepo = makePrismaRefreshTokenRepository();
  const tokenService = makeTokenService();

  return new SignInUseCase(usersRepo, refreshTokenRepo, tokenService);
}

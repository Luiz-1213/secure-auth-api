import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

import { makePrismaRefreshTokenRepository } from './makePrismaRefreshTokenRepository';
import { makePrismaUserRepository } from './makePrismaUserRepository';
import { makeTokenService } from './makeTokenService';

export function makeSignUpUseCase() {
  const usersRepo = makePrismaUserRepository();
  const refreshTokenRepo = makePrismaRefreshTokenRepository();
  const tokenService = makeTokenService();

  return new SignUpUseCase(usersRepo, refreshTokenRepo, tokenService);
}

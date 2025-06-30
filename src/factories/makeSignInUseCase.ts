import { SignInUseCase } from '../application/useCases/SignInUseCase';

import { makeAuthService } from './makeAuthService';
import { makePrismaUserRepository } from './makePrismaUserRepository';

export function makeSignInUseCase() {
  const usersRepo = makePrismaUserRepository();
  const authService = makeAuthService();

  return new SignInUseCase(usersRepo, authService);
}

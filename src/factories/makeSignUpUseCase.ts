import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

import { makeAuthService } from './makeAuthService';
import { makePrismaUserRepository } from './makePrismaUserRepository';

export function makeSignUpUseCase() {
  const usersRepo = makePrismaUserRepository();
  const authService = makeAuthService();

  return new SignUpUseCase(usersRepo, authService);
}

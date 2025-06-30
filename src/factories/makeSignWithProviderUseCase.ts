import { SignWithProviderUseCase } from '../application/useCases/SignWithProviderUseCase';

import { makeAuthService } from './makeAuthService';
import { makePrismaUserRepository } from './makePrismaUserRepository';

export function makeSignWithProviderUseCase() {
  const usersRepo = makePrismaUserRepository();
  const authService = makeAuthService();

  return new SignWithProviderUseCase(usersRepo, authService);
}

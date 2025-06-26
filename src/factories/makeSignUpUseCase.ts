import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

import { makePrismaUserRepository } from './makePrismaUserRepository';

export function makeSignUpUseCase() {
  const usersRepo = makePrismaUserRepository();
  return new SignUpUseCase(usersRepo);
}

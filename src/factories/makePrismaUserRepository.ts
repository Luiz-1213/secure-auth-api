import { PrismaUserRepository } from '../domain/repositories/user/PrismaUserRepository';

export function makePrismaUserRepository() {
  return new PrismaUserRepository();
}

import { PrismaRefreshTokenRepository } from '../domain/repositories/refreshToken/PrismaRefreshTokenRepository';

export function makePrismaRefreshTokenRepository() {
  return new PrismaRefreshTokenRepository();
}

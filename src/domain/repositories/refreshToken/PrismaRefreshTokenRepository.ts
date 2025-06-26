import { prismaClient } from '../../../application/libs/prismaClient';

import {
  ICreateToken,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository';

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async findById(id: string) {
    return prismaClient.refreshToken.findUnique({
      where: { id },
    });
  }

  async create({ userId, expiresAt }: ICreateToken) {
    return prismaClient.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
  }

  deleteById(id: string) {
    prismaClient.refreshToken.delete({
      where: { id },
    });
  }
}

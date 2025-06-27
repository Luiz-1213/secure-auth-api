import { prismaClient } from '../../../application/libs/prismaClient';

import {
  ICreateToken,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository';

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async findById(id: string) {
    return await prismaClient.refreshToken.findUnique({
      where: { id },
    });
  }

  async create({ userId, expiresAt }: ICreateToken) {
    return await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
  }

  async deleteById(id: string) {
    await prismaClient.refreshToken.delete({
      where: { id },
    });
  }
}

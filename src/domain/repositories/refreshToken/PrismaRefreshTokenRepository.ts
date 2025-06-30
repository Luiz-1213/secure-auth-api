import { prismaClient } from '../../../application/libs/prismaClient';

import {
  ICreateToken,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository';

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async findById(id: string) {
    const refreshToken = await prismaClient.refreshToken.findUnique({
      where: { id },
      include: { user: { select: { roleId: true } } },
    });

    if (refreshToken === null) {
      return null;
    }

    const { user, ...tokenData } = refreshToken;

    return { ...tokenData, roleId: user.roleId };
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

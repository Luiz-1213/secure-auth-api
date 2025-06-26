import { prismaClient } from '../../../application/libs/prismaClient';

import { ICreateUser, IUserRepository } from './IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUser) {
    const user = await prismaClient.user.create({
      data: {
        ...data,
        roleId: '171eb952-c726-4925-a00a-d7fb098e2f13',
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }
}

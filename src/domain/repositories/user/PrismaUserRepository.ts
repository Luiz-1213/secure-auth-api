import { prismaClient } from '../../../application/libs/prismaClient';
import { User } from '../../entities/User';

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

  async createOrUpdate(data: ICreateUser): Promise<User> {
    const user = await prismaClient.user.upsert({
      create: { ...data, roleId: '171eb952-c726-4925-a00a-d7fb098e2f13' },
      update: {},
      where: { email: data.email },
    });

    return user;
  }

  async findByEmail(email: string) {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }
}
